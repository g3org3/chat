// @ts-check
import z from 'zod'
import { db } from '../utils/mongoClient.js'

export const input = z.object({
  name: z.string(),
  username: z.string(),
})

/**
* @param {z.infer<typeof input>} input
* @returns {Promise<{ id: string }>}
*/
export const handler = async ({ name, username }) => {
  const result = await db.channels.findOne({ name })

  if (result) {
    throw new Error("400|channel already exists.")
  }
  const item = await db.channels.insertOne({ name, username, createdAt: new Date() })

  return { id: item.insertedId.toString() }
}

export const get = async () => {
  const result = db.channels.find()

  return result.toArray()
}
