import { fetchApi } from '../api-client';

export const mailApi = {
  submitContactForm: async (data: any) => {
    const payload: any = { ...data };
    if (payload.captchaToken) {
      payload.turnstile_token = payload.captchaToken;
      delete payload.captchaToken;
    }
    return fetchApi('/mail/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  subscribeNewsletter: async (data: any) => {
    return fetchApi('/mail/newsletter', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
