// @ts-check
import * as apiuser from './user.js'
import * as apimessage from './message.js'
import * as apichannel from './channel.js'
import { ZodError } from 'zod'

/**
* @param {import("express").Express} app
*/
export default function setupApi(app) {
  app.get('/api/user/me', (req, res) => {
    console.log('[GET]', req.path)
    console.log(req.session)
    apiuser.get({ userId: req.session?.userId })
      .then(r => res.status(200).json(r))
      .catch(handleError(res))
  })

  app.post('/api/user', (req, res) => {
    console.log('[POST]', req.path)
    apiuser.input
      .parseAsync(req.body)
      .then(payload => apiuser.handler(payload, req))
      .then(r => res.status(200).json(r))
      .catch(handleError(res))
  })

  app.get('/api/channel', (req, res) => {
    console.log('[GET]', req.path)
    apichannel.get()
      .then(r => res.status(200).json(r))
      .catch(handleError(res))
  })

  app.post('/api/channel', (req, res) => {
    console.log('[POST]', req.path)
    apichannel.input
      .parseAsync(req.body)
      .then(payload => apichannel.handler(payload))
      .then(r => res.status(200).json(r))
      .catch(handleError(res))
  })

  app.get('/api/channel/:id/message', (req, res) => {
    apimessage.get({ channelId: req.params.id })
      .then(r => res.status(200).json(r))
      .catch(handleError(res))
  })

  app.post('/api/message', (req, res) => {
    console.log('[POST]', req.path)
    apimessage.input
      .parseAsync(req.body)
      .then(payload => apimessage.handler(payload))
      .then(r => res.status(200).json(r))
      .catch(handleError(res))
  })
}


/**
* @param {import("express").Response} res
* @returns {(e: Error) => void} error-callback
*/
function handleError(res) {
  return (e) => {
    if (e instanceof ZodError) {
      console.log('[ERROR]', e.name, e.issues)
      res.status(400).json({ status: 'badrequest', issues: e.issues })
    } else {
      let status = 500
      let message = e.message
      let type = 'internal-error'
      const parts = message.split('|')

      if (parts.length === 2) {
        status = Number(parts[0])
        message = parts[1]
        type = 'custom'
      }

      console.error('[ERROR]', status, message)
      res.status(status).json({ type, status, message })
    }
  }
}
