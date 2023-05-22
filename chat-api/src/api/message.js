// @ts-check
import z from 'zod'
import { ObjectId } from 'mongodb'

import { db } from '../utils/mongoClient.js'
import { socket } from '../utils/pusher.js'

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
  const result = await db.channels.findOne({ _id: new ObjectId(channelId) })

  if (!result) {
    throw new Error("400|channel does not exists.")
  }
  const item = await db.messages.insertOne({ text, channelId, username, createdAt: new Date() })
  try {
    socket.trigger(channelId, 'invalidate:messages', 'all')
  } catch (e) {
    console.log(e)
  }

  return { id: item.insertedId.toString() }
}

/**
 * @param {{channelId: string}} input
 */
export const get = async ({ channelId }) => {
  const result = db.messages.find({ channelId })

  return result.toArray()
}


export const putInput = z.object({
  username: z.string(),
  id: z.string(),
  channelId: z.string(),
  text: z.string(),
})
/**
 * @param {z.infer<typeof putInput>} input
 */
export const put = async ({ id, username, channelId, text }) => {
  const message = await db.messages.findOne({ _id: new ObjectId(id) })
  if (!message) throw new Error('400|Message not found')
  if (message.username !== username) throw new Error('403|You cannot edit this message')

  await db.messages.updateOne({ _id: new ObjectId(id) }, { $set: { text } })

  try {
    socket.trigger(channelId, 'invalidate:messages', 'all')
  } catch (e) {
    console.log(e)
  }

  return {}
}
