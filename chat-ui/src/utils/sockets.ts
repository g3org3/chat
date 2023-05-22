import PusherJS from 'pusher-js'

const options = {
  cluster: 'en',
  wsHost: import.meta.env.VITE_SOKETI_HOST || '127.0.0.1',
  wsPort: import.meta.env.VITE_SOKETI_PORT || 6001,
  forceTLS: Boolean(import.meta.env.VITE_SOKETI_HOST),
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
}

// @ts-ignore
export const socket = new PusherJS(import.meta.env.VITE_SOKETI_KEY || 'app-key', options);

