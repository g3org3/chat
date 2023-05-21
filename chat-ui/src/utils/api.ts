export const api = (endpoint: string, payload?: any) => {
  const options: Record<string, any> = {}
  if (!!payload) {
    options.method = 'POST'
    if (typeof payload === 'string') {
      options.body = payload
    }
    if (typeof payload === 'object') {
      options.body = JSON.stringify(payload)
      options.headers = { 'Content-Type': 'application/json'}
    }
  }
  
  return fetch(endpoint, options)
    .then(r => {
      if (r.status > 299) throw new Error(r.statusText)
      return r.json()
    })
}
