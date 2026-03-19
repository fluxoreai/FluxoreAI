import { fetchApi } from '../api-client';

export interface MapPinRequest {
  address: string;
  zoom?: number;
  width?: number;
  height?: number;
}

export interface MapPinResponse {
  address: string;
  embed_url: string;
  maps_link: string;
  iframe: string;
  zoom: number;
  width: number;
  height: number;
}

export const mapsApi = {
  getPin: async (data: MapPinRequest) => {
    return (await fetchApi('/maps/pin', {
      method: 'POST',
      body: JSON.stringify(data),
    })) as { data: MapPinResponse };
  },
};
