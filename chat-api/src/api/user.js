// @ts-check
import z from 'zod'
import { db } from '../utils/mongoClient.js'

export const input = z.object({ username: z.string() })

/**
* @param {z.infer<typeof input>} input
* @returns {Promise<{ id: string }>}
*/
export const handler = async ({ username }) => {
  const result = await db.users.findOne({ username })

  if (result) {
    return { id: result._id.toString() }
  }
  const item = await db.users.insertOne({ username, createdAt: new Date() })

  return { id: item.insertedId.toString() }
}
