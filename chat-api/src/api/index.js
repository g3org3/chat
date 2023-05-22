import * as apiuser from './user.js'
import * as apimessage from './message.js'
import * as apichannel from './channel.js'
import { ZodError } from 'zod'

/**
* @param {import("express").Express} app
*/
export default function setupApi(app) {
  app.post('/api/user', (req, res) => {
    console.log('[POST]', req.path)
    apiuser.input
      .parseAsync(req.body)
      .then(payload => apiuser.handler(payload))
      .then(r => res.status(200).json(r))
      .catch(handleError)
  })

  app.get('/api/channel', (_, res) => {
    apichannel.get()
      .then(r => res.status(200).json(r))
      .catch(handleError)
  })

  app.post('/api/channel', (req, res) => {
    console.log('[POST]', req.path)
    apichannel.input
      .parseAsync(req.body)
      .then(payload => apichannel.handler(payload))
      .then(r => res.status(200).json(r))
      .catch(handleError)
  })

  app.post('/api/message', (req, res) => {
    console.log('[POST]', req.path)
    apimessage.input
      .parseAsync(req.body)
      .then(payload => apimessage.handler(payload))
      .then(r => res.status(200).json(r))
      .catch(handleError)
  })
}

function handleError(e) {
  if (e instanceof ZodError) {
    console.log('[ERROR]', e.name, e.issues)
    res.status(400).json({ status: 'badrequest', issues: e.issues })
  } else {
    let status = 500
    let message = e.message
    const parts = message.split('|')

    if (parts.length === 2) {
      status = Number(parts[0])
      message = parts[1]
    }

    console.error('[ERROR]', status, e.message)
    res.status(status).json({ status: 'error', message: e.message })
  }
}
