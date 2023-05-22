import { create } from 'zustand'

interface Message {
  id: string
  text: string
  username: string
  createdAt: string
}

interface Channel {
  _id: string
  name: string
  username: string
  createdAt: string
}

interface ChatActions {
  setUsername: (name: string | null) => void
  addChannel: (name: string, id: string) => void
  openChannel: (id: string | null) => void
  addMessage: (text: string, id: string) => void
  setChannels: (channels: Channel[]) => void
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
    setChannels: (channels) => set(_ => {
      const channelsById = new Map()
      channels.forEach(channel => {
        channelsById.set(channel._id, channel)
      })
    
      return {
        channelsById,
        channelIds: channels.map(x => x._id)
      }
    }),
    addChannel: (name, id) => set(s => {
      if (!s.username) return s

      s.channelsById.set(id, { _id: id, name, username: s.username, createdAt: (new Date()).toISOString() })

      return {
        channelIds: s.channelIds.concat([id])
      }
    }),
    addMessage: (text, id) => set(s => {
      if (!s.username || !s.selectedChannel) return s

      const message = {
        id,
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
