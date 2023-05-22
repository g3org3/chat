import PusherJS from 'pusher-js'

const options = {
  cluster: 'en',
  wsHost: '127.0.0.1',
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
}

// @ts-ignore
export const socket = new PusherJS('app-key', options);

