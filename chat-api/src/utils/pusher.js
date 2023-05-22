import Pusher from 'pusher'

export const socket = new Pusher({
  appId: 'app-id',
  key: 'app-key',
  secret: 'app-secret',
  cluster: 'en',
  host: '127.0.0.1',
  port: '6001',
  useTLS: false,
})
