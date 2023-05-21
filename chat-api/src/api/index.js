import * as apiUser from './user.js'

/**
* @param {import("express").Express} app
*/
export default function setupApi(app) {
  app.post('/api/user', (req, res) => {
    apiUser.input
      .parseAsync(req.body)
      .then(payload => apiUser.handler(payload))
      .then(r => res.status(200).json(r))
      .catch((e) => {
        console.error('[ERROR]', e.message)
        res.status(500).json({ status: 'error', message: e.message })
      })
  })
}
