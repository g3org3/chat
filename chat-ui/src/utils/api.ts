export const api = async (endpoint: string, payload?: any) => {

  const options: Record<string, any> = {}
  if (!!payload) {
    options.method = 'POST'
    if (typeof payload === 'string') {
      options.body = payload
    }
    if (typeof payload === 'object') {
      options.body = JSON.stringify(payload)
      options.headers = { 'Content-Type': 'application/json' }
    }
  }

  const res = await fetch(endpoint, options)
  let json: Record<string, any> = {}

  try {
    json = await res.json()
  } catch { }

  if (res.status === 400) {
    if (json.type === 'custom') {
      throw new Error(json.message)
    } else {
      throw new Error("")
    }
  } else if (res.status > 299) throw new Error("")

  return json
}
