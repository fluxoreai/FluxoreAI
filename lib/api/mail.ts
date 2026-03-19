import { fetchApi } from '../api-client';

export const mailApi = {
  submitContactForm: async (data: any) => {
    return fetchApi('/mail/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  subscribeNewsletter: async (data: any) => {
    return fetchApi('/mail/newsletter', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
