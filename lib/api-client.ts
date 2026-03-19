export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.fluxoreai.com/api';

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message || 'An error occurred',
      errors: data?.errors || {},
    };
  }

  return data;
}
