import { fetchApi } from '../api-client';

export interface PaymentMethod {
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  card_holder: string;
}

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface SubscriptionRequest {
  plan_slug: string;
  payment_method: PaymentMethod;
  billing_address: BillingAddress;
}

export const paymentsApi = {
  getSubscriptionPlans: async () => {
    try {
      return await fetchApi('/subscription-plans', { method: 'GET' });
    } catch (error) {
      // Fallback for mocked plans if endpoint is unavailable
      console.warn('Could not fetch subscription plans. Using fallback data.', error);
      return {
        data: [
          {
            id: 1,
            name: "Basic",
            slug: "basic",
            description: "Perfect for hobbyists and side projects.",
            price_monthly: "0.00",
            price_yearly: "0.00",
            features: ["5 Neural Syncs/mo", "Community Support", "Basic Telemetry", "1 Global Node"],
            is_popular: false,
            is_active: true
          },
          {
            id: 2,
            name: "Pro",
            slug: "pro",
            description: "The standard for professional engineering teams.",
            price_monthly: "49.00",
            price_yearly: "39.00",
            features: ["Unlimited Neural Syncs", "24/7 Priority Support", "Advanced Telemetry", "12 Global Nodes", "Post-Quantum Auth"],
            is_popular: true,
            is_active: true
          },
          {
            id: 3,
            name: "Enterprise",
            slug: "enterprise",
            description: "Bespoke intelligence for large-scale operations.",
            price_monthly: "Custom",
            price_yearly: "Custom",
            features: ["Custom Sync Protocols", "Dedicated CSM", "Full Data Sovereignty", "Unlimited Global Nodes", "On-premise deployment"],
            is_popular: false,
            is_active: true
          }
        ]
      }
    }
  },

  subscribe: async (data: SubscriptionRequest) => {
    return fetchApi('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  processPayment: async (data: any) => {
    return fetchApi('/payments/process', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  getPayments: async (params?: { status?: string; limit?: number; offset?: number }) => {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return fetchApi(`/payments${query}`, { method: 'GET' });
  }
};
