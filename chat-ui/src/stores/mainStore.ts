import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

interface Message {
  id: string
  text: string
  username: string
  createdAt: string
}

interface Channel {
  id: string
  name: string
}

interface ChatActions {
  setUsername: (name: string | null) => void
  addChannel: (name: string) => void
  openChannel: (id: string | null) => void
  addMessage: (text: string) => void
}

interface ChatState {
  selectedChannel: string | null
  selectedMessageIds: string[]
  username: string | null
  channelIds: string[]
  channelsById: Map<string, Channel>
  messageIdsByChannelId: Map<string, string[]>,
  messagesById: Map<string, Message>
}

interface ChatStore extends ChatState {
  actions: ChatActions
}

export const useChatStore = create<ChatStore>((set) => ({
  actions: {
    openChannel: (id) => set(s => {
      if (!id) return { selectedChannel: null }
      
      const messageIds = s.messageIdsByChannelId.get(id) || []
      return { selectedChannel: id, selectedMessageIds: messageIds }
    }),
    setUsername: (username) => set({ username }),
    addChannel: (name) => set(s => {
      const id = uuid()
      s.channelsById.set(id, { id, name })

      return {
        channelIds: s.channelIds.concat([id])
      }
    }),
    addMessage: (text) => set(s => {
      if (!s.username || !s.selectedChannel) return s

      const message = {
        id: uuid(),
        username: s.username,
        text,
        createdAt: (new Date()).toISOString(),
      }

      s.messagesById.set(message.id, message)
      const messageIds = s.selectedMessageIds.concat([message.id])
      s.messageIdsByChannelId.set(s.selectedChannel, messageIds)

      return {
        selectedMessageIds: messageIds,
      }
    }),
  },
  channelIds: [],
  selectedMessageIds: [],
  messageIdsByChannelId: new Map(),
  messagesById: new Map(),
  channelsById: new Map(),
  username: null,
  selectedChannel: null,
}))
