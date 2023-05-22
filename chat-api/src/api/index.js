import * as apiuser from './user.js'
import * as apimessage from './message.js'
import * as apichannel from './channel.js'

/**
* @param {import("express").Express} app
*/
export default function setupApi(app) {
  app.post('/api/user', (req, res) => {
    apiuser.input
      .parseAsync(req.body)
      .then(payload => apiuser.handler(payload))
      .then(r => res.status(200).json(r))
      .catch((e) => {
        console.error('[ERROR]', e.message)
        res.status(500).json({ status: 'error', message: e.message })
      })
  })
  
  app.post('/api/channel', (req, res) => {
    apichannel.input
      .parseAsync(req.body)
      .then(payload => apichannel.handler(payload))
      .then(r => res.status(200).json(r))
      .catch((e) => {
        console.error('[ERROR]', e.message)
        res.status(500).json({ status: 'error', message: e.message })
      })
  })
  
  app.post('/api/message', (req, res) => {
    apimessage.input
      .parseAsync(req.body)
      .then(payload => apimessage.handler(payload))
      .then(r => res.status(200).json(r))
      .catch((e) => {
        console.error('[ERROR]', e.message)
        res.status(500).json({ status: 'error', message: e.message })
      })
  })
}
