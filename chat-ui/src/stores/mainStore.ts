import { create } from 'zustand'

interface ChatActions {
  setUsername: (name: string | null) => void
}

interface ChatState {
  username: string | null
}

interface ChatStore extends ChatState {
  actions: ChatActions
}

export const useChatStore = create<ChatStore>((set) => ({
  actions: {
    setUsername: (username) => set({ username })
  },
  username: null
}))
