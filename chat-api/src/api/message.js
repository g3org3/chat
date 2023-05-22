// @ts-check
import z from 'zod'
import { db } from '../utils/mongoClient.js'

export const input = z.object({
  channelId: z.string(),
  username: z.string(),
  text: z.string(),
})

/**
* @param {z.infer<typeof input>} input
* @returns {Promise<{ id: string }>}
*/
export const handler = async ({ channelId, username, text }) => {
  const result = await db.channels.findOne({ id: channelId })

  if (!result) {
    throw new Error("400|channel does not exists.")
  }
  const item = await db.users.insertOne({ text, channelId, username, createdAt: new Date() })

  return { id: item.insertedId.toString() }
}
