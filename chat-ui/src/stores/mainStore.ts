import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

interface Channel {
  id: string
  name: string
}

interface ChatActions {
  setUsername: (name: string | null) => void,
  addChannel: (name: string) => void
}

interface ChatState {
  username: string | null
  channelIds: string[]
  channelsById: Map<string, Channel>
}

interface ChatStore extends ChatState {
  actions: ChatActions
}

export const useChatStore = create<ChatStore>((set) => ({
  actions: {
    setUsername: (username) => set({ username }),
    addChannel: (name) => set(s => {
      console.log('[add:channel]', name)
      const id = uuid()
      s.channelsById.set(id, { id, name })

      return {
        channelIds: s.channelIds.concat([id])
      }
    })
  },
  channelIds: [],
  channelsById: new Map(),
  username: null
}))
