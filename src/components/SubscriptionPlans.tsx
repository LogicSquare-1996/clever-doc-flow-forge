
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlansProps {
  onSelectPlan: (planType: 'basic' | 'pro' | 'enterprise') => void;
  currentPlan?: string;
  isLoading?: boolean;
}

export const SubscriptionPlans = ({ onSelectPlan, currentPlan, isLoading = false }: SubscriptionPlansProps) => {
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      description: 'Perfect for occasional document needs',
      features: [
        '10 documents per month',
        'Basic templates',
        'PDF downloads',
        'Email support'
      ],
      icon: <Check className="h-5 w-5" />,
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      description: 'Best for regular business use',
      features: [
        'Unlimited documents',
        'All premium templates',
        'PDF & Word downloads',
        'Priority support',
        'Custom branding',
        'Advanced signatures'
      ],
      icon: <Star className="h-5 w-5" />,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      description: 'For teams and large organizations',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'API access',
        'Custom templates',
        'Dedicated support',
        'White-label solution'
      ],
      icon: <Zap className="h-5 w-5" />,
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (isLoading) return;
    
    if (currentPlan === planId) {
      toast({
        title: "Current Plan",
        description: `You are already subscribed to the ${planId} plan.`,
      });
      return;
    }

    onSelectPlan(planId as 'basic' | 'pro' | 'enterprise');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative ${
            plan.popular 
              ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
              : ''
          } ${
            currentPlan === plan.id 
              ? 'bg-green-50 border-green-500' 
              : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-purple-600 text-white">Most Popular</Badge>
            </div>
          )}
          {currentPlan === plan.id && (
            <div className="absolute -top-3 right-4">
              <Badge className="bg-green-600 text-white">Current Plan</Badge>
            </div>
          )}
          
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              {plan.icon}
            </div>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription className="text-sm">{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className={`w-full ${
                plan.popular 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : ''
              }`}
              variant={currentPlan === plan.id ? "outline" : "default"}
              onClick={() => handleSelectPlan(plan.id)}
              disabled={isLoading || currentPlan === plan.id}
            >
              {isLoading ? 'Processing...' : 
               currentPlan === plan.id ? 'Current Plan' : 
               `Choose ${plan.name}`}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
