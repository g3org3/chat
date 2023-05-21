import { create } from 'zustand'

interface ChatActions {
  setUsername: (name: string) => void
}

interface ChatState {
  username: string | null
}

interface ChatStore extends ChatState {
  actions: ChatActions
}

export const useChatStore = create<ChatStore>((set) => ({
  actions: {
    setUsername: (username: string) => set({ username })
  },
  username: null
}))
