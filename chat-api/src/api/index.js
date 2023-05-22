import * as apiuser from './user.js'
import * as apimessage from './message.js'
import * as apichannel from './channel.js'
import { ZodError } from 'zod'

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
        if (e instanceof ZodError) {
          console.log('[ERROR]', e.name, e.issues)
          res.status(400).json({ status: 'badrequest', issues: e.issues })
        } else {
          let status = 500
          let message = e.message
          try {
            const st = Number(e.message.split('|')[0])
            if (st) {
              status = 500
              message = e.message.split('|')[1]
            }
          } catch { }
          console.error('[ERROR]', e.message)
          res.status(status).json({ status: 'error', message: e.message })
        }
      })
  })

  app.post('/api/channel', (req, res) => {
    apichannel.input
      .parseAsync(req.body)
      .then(payload => apichannel.handler(payload))
      .then(r => res.status(200).json(r))
      .catch((e) => {
        if (e instanceof ZodError) {
          console.log('[ERROR]', e.name, e.issues)
          res.status(400).json({ status: 'badrequest', issues: e.issues })
        } else {
          let status = 500
          let message = e.message
          try {
            const st = Number(e.message.split('|')[0])
            if (st) {
              status = 500
              message = e.message.split('|')[1]
            }
          } catch { }
          console.error('[ERROR]', e.message)
          res.status(status).json({ status: 'error', message: e.message })
        }
      })
  })

  app.post('/api/message', (req, res) => {
    apimessage.input
      .parseAsync(req.body)
      .then(payload => apimessage.handler(payload))
      .then(r => res.status(200).json(r))
      .catch((e) => {
        if (e instanceof ZodError) {
          console.log('[ERROR]', e.name, e.issues)
          res.status(400).json({ status: 'badrequest', issues: e.issues })
        } else {
          let status = 500
          let message = e.message
          try {
            const st = Number(e.message.split('|')[0])
            if (st) {
              status = 500
              message = e.message.split('|')[1]
            }
          } catch { }
          console.error('[ERROR]', e.message)
          res.status(status).json({ status: 'error', message: e.message })
        }
      })
  })
}
