// @ts-check
import z from 'zod'
import { db } from '../utils/mongoClient.js'
import { ObjectId } from 'mongodb'

export const input = z.object({ username: z.string() })

/**
* @param {z.infer<typeof input>} input
* @param {import("express").Request & { session: { userId: string }}} req
* @returns {Promise<{ id: string }>}
*/
export const handler = async ({ username }, req) => {
  let user = await db.users.findOne({ username })
  if (!user) {
    await db.users.insertOne({ username, createdAt: new Date() })
    user = await db.users.findOne({ username })
  }
  if (!user) {
    throw Error('something is really wrong')
  }
  const id = user._id.toString()
  req.session.userId = id

  return { id }
}

/**
 * @param {{userId?: string}} input
 */
export const get = async ({ userId }) => {
  if (!userId) return { username: null }
  const result = await db.users.findOne({ _id: new ObjectId(userId) })

  return { username: result?.username }
}
