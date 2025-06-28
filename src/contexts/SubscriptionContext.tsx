
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
  checkSubscription: () => Promise<void>;
  updateSubscription: (subscribed: boolean, tier?: string, end?: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);

  const checkSubscription = async () => {
    try {
      // This would call your backend API to check subscription status
      // For now, we'll simulate the response
      console.log('Checking subscription status...');
      // const response = await fetch('/api/payments/check-subscription');
      // const data = await response.json();
      // setIsSubscribed(data.subscribed);
      // setSubscriptionTier(data.subscription_tier);
      // setSubscriptionEnd(data.subscription_end);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const updateSubscription = (subscribed: boolean, tier?: string, end?: string) => {
    setIsSubscribed(subscribed);
    setSubscriptionTier(tier || null);
    setSubscriptionEnd(end || null);
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        subscriptionTier,
        subscriptionEnd,
        checkSubscription,
        updateSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
