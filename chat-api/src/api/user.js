// @ts-check
import z from 'zod'

export const input = z.object({ username: z.string() })

/**
* @param {z.infer<typeof input>} input
* @returns {Promise<string>}
*/
export const handler = async (input) => {
  console.log(input)

  return ""
}
