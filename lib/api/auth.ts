import { fetchApi, setAuthToken, removeAuthToken } from '../api-client';

export interface LoginCredentials {
  email: string;
  password_hash: string;
  captchaToken?: string;
}

export interface RegisterData {
  username?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password_hash: string;
  password_hash_confirmation: string;
  captchaToken?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const payload: any = { ...credentials };
    if (payload.captchaToken) {
      payload.turnstile_token = payload.captchaToken;
      delete payload.captchaToken;
    }
    const response = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (response?.data?.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },
  
  register: async (userData: RegisterData) => {
    const payload: any = { ...userData };
    if (payload.captchaToken) {
      payload.turnstile_token = payload.captchaToken;
      delete payload.captchaToken;
    }
    const response = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (response?.data?.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },
  
  logout: async () => {
    try {
      await fetchApi('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error formatting, ignoring', e);
    } finally {
      // Always clear token locally even if server fails
      removeAuthToken();
    }
  },
  
  getUserProfile: async () => {
    return fetchApi('/user', { method: 'GET' });
  },
  
  googleLogin: async (accessToken: string) => {
    const response = await fetchApi('/auth/google/token', {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken })
    });
    if (response?.data?.token) {
       setAuthToken(response.data.token);
    }
    return response;
  },

  githubLogin: async (accessToken: string) => {
    const response = await fetchApi('/auth/github/token', {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken })
    });
    if (response?.data?.token) {
       setAuthToken(response.data.token);
    }
    return response;
  }
};
