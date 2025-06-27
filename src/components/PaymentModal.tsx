
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, FileText, Users } from 'lucide-react';
import { SubscriptionPlans } from './SubscriptionPlans';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName?: string;
  onPayment: (type: 'single' | 'subscription', planType?: string) => void;
  isLoading?: boolean;
}

export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  documentName = "Document", 
  onPayment,
  isLoading = false 
}: PaymentModalProps) => {
  const [paymentType, setPaymentType] = useState<'single' | 'subscription' | null>(null);

  const handleSinglePayment = () => {
    onPayment('single');
  };

  const handleSubscriptionSelect = (planType: string) => {
    onPayment('subscription', planType);
  };

  const resetSelection = () => {
    setPaymentType(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Choose Payment Option</span>
          </DialogTitle>
          <DialogDescription>
            Select how you'd like to access your document: buy once or subscribe for unlimited access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!paymentType && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Single Purchase Option */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">Buy This Document</CardTitle>
                    </div>
                    <CardDescription>One-time purchase for this specific document</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-blue-600">$4.99</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Perfect if you only need "{documentName}" right now.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Instant access to this document</li>
                        <li>• PDF and Word formats</li>
                        <li>• Lifetime access to this file</li>
                      </ul>
                      <Button 
                        className="w-full" 
                        onClick={handleSinglePayment}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Buy Now - $4.99'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Option */}
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-lg">Subscribe & Save</CardTitle>
                    </div>
                    <CardDescription>Unlimited documents with monthly subscription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-purple-600">Starting at $9.99/mo</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Best value for regular document needs.
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Unlimited document generation</li>
                        <li>• All premium templates</li>
                        <li>• Priority support</li>
                        <li>• Cancel anytime</li>
                      </ul>
                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700" 
                        onClick={() => setPaymentType('subscription')}
                        disabled={isLoading}
                      >
                        View Plans
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  All payments are secure and processed by Stripe. 30-day money-back guarantee.
                </p>
              </div>
            </>
          )}

          {paymentType === 'subscription' && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Choose Your Plan</h3>
                <Button variant="outline" size="sm" onClick={resetSelection}>
                  Back to Options
                </Button>
              </div>
              <Separator />
              <SubscriptionPlans 
                onSelectPlan={handleSubscriptionSelect}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
