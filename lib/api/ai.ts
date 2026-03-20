import { fetchApi } from '../api-client';

export interface AiGenerateRequest {
  prompt?: string;
  messages?: { role: string; content: string }[];
  model?: string;
  max_tokens?: number;
  async?: boolean;
}

export interface AiGenerateResponse {
  id: string | number;
  model: string;
  prompt?: string;
  response?: string; // Legacy/Fallback
  choices?: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  status: string;
  tokens_used?: number;
}

export const aiApi = {
  generate: async (data: AiGenerateRequest) => {
    return (await fetchApi('/ai/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    })) as { data: AiGenerateResponse };
  },
};
