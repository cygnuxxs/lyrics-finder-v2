import Genius from 'genius-lyrics'
let cachedClient :Genius.Client | null = null

export function getGeniusClient() {
  if (!cachedClient) {
    cachedClient = new Genius.Client()
  }
  return cachedClient
}