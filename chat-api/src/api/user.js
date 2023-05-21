// @ts-check
import z from 'zod'
import mongoClient from '../utils/mongoClient.js'

export const input = z.object({ username: z.string() })

/**
* @param {z.infer<typeof input>} input
* @returns {Promise<{ id: string }>}
*/
export const handler = async ({ username }) => {
  const client = await mongoClient
  const result = await client.db("chatdb").collection("users").findOne({ username })

  if (result) {
    return { id: result._id.toString() }
  }
  const item = await client.db("chatdb").collection("users").insertOne({ username })

  return { id: item.insertedId.toString() }
}
