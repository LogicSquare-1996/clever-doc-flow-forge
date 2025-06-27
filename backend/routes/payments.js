
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const DocumentPurchase = require('../models/DocumentPurchase');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create single document payment
router.post('/create-single-payment', async (req, res) => {
  try {
    const { documentId, amount = 4.99, guestEmail } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        documentId,
        type: 'single_document',
        guestEmail: guestEmail || '',
        userId: req.user?._id?.toString() || ''
      }
    });

    // Create purchase record
    const purchase = new DocumentPurchase({
      documentId,
      userId: req.user?._id,
      guestEmail,
      stripePaymentIntentId: paymentIntent.id,
      amount,
      status: 'pending'
    });

    await purchase.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      purchaseId: purchase._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subscription checkout
router.post('/create-subscription', auth, async (req, res) => {
  try {
    const { planType } = req.body;
    
    const priceIds = {
      basic: process.env.STRIPE_BASIC_PRICE_ID,
      pro: process.env.STRIPE_PRO_PRICE_ID,
      enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID
    };

    const session = await stripe.checkout.sessions.create({
      customer_email: req.user.email,
      line_items: [{
        price: priceIds[planType],
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/`,
      metadata: {
        userId: req.user._id.toString(),
        planType
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check subscription status
router.get('/check-subscription', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      userId: req.user._id,
      status: 'active'
    });

    if (subscription && new Date() < subscription.currentPeriodEnd) {
      res.json({
        subscribed: true,
        subscription_tier: subscription.planName,
        subscription_end: subscription.currentPeriodEnd
      });
    } else {
      res.json({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        if (paymentIntent.metadata.type === 'single_document') {
          await DocumentPurchase.findOneAndUpdate(
            { stripePaymentIntentId: paymentIntent.id },
            { status: 'completed' }
          );
        }
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;

      case 'customer.subscription.deleted':
        const cancelledSub = event.data.object;
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: cancelledSub.id },
          { status: 'cancelled' }
        );
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

async function handleSubscriptionUpdate(stripeSubscription) {
  const subscription = await Subscription.findOneAndUpdate(
    { stripeSubscriptionId: stripeSubscription.id },
    {
      status: stripeSubscription.status,
      currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
    },
    { upsert: true, new: true }
  );

  // Update user subscription status
  if (subscription.userId) {
    await User.findByIdAndUpdate(subscription.userId, {
      'clientData.subscriptionStatus': stripeSubscription.status
    });
  }
}

module.exports = router;
