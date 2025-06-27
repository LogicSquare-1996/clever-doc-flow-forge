import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

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
      console.log('Checking subscription status...');
      const response = await apiClient.checkSubscription();
      setIsSubscribed(response.subscribed);
      setSubscriptionTier(response.subscription_tier);
      setSubscriptionEnd(response.subscription_end);
    } catch (error) {
      console.error('Error checking subscription:', error);
      // If not authenticated, reset subscription status
      setIsSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
    }
  };

  const updateSubscription = (subscribed: boolean, tier?: string, end?: string) => {
    setIsSubscribed(subscribed);
    setSubscriptionTier(tier || null);
    setSubscriptionEnd(end || null);
  };

  useEffect(() => {
    // Only check subscription if user is authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      checkSubscription();
    }
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
