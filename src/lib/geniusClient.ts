import { Client as GeniusClient } from 'genius-lyrics';

let cachedClient: GeniusClient | null = null;

export const getGeniusClient = (accessToken?: string): GeniusClient => {
  if (!cachedClient) {
    try {
      cachedClient = new GeniusClient(accessToken);
    } catch (error) {
      console.error('Failed to create Genius client:', error);
      throw new Error('Unable to initialize Genius client');
    }
  }
  return cachedClient;
};