import Pusher from 'pusher'

export const socket = new Pusher({
  appId: process.env.SOKETI_ID || 'app-id',
  key: process.env.SOKETI_KEY || 'app-key',
  secret: process.env.SOKETI_SECRET || 'app-secret',
  cluster: 'en',
  host: process.env.SOKETI_HOST || '127.0.0.1',
  port: process.env.SOKETI_PORT || '6001',
  useTLS: Boolean(process.env.SOKETI_HOST),
})
