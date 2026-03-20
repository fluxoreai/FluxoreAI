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
            name: "Basic Flow",
            slug: "basic",
            description: "For individuals and small teams exploring smarter workflows.",
            price: 0,
            interval: "month",
            currency: "USD",
            features: ["5 Workflow Insights/mo", "Basic Workflow Analytics", "1 Tool Integration", "Community Support"],
            is_popular: false,
            is_active: true
          },
          {
            id: 2,
            name: "Studio",
            slug: "pro",
            description: "Powerful workflow intelligence for growing teams.",
            price: 49,
            interval: "month",
            currency: "USD",
            features: ["Unlimited Workflow Insights", "Advanced Workflow Analytics", "Up to 15 Tool Integrations", "AI Workflow Optimization", "Priority Support"],
            is_popular: true,
            is_active: true
          },
          {
            id: 3,
            name: "Enterprise Flux",
            slug: "enterprise",
            description: "Advanced workflow intelligence for large organizations.",
            price: "Custom",
            interval: "month",
            currency: "USD",
            features: ["Unlimited Workflow Monitoring", "Custom AI Optimization Models", "Unlimited Integrations", "Enterprise Security & Compliance", "Dedicated Customer Success Manager", "Private or On-Premise Deployment"],
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
