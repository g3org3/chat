import { getFormData } from "../utils/form"
import { useChatStore } from "../stores/mainStore"
import { toast } from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { api } from "../utils/api"
import sendsvg from '../icons/Send.svg'

export default function MessageInput() {
  const addMessage = useChatStore(s => s.actions.addMessage)
  const channelId = useChatStore(s => s.selectedChannel)
  const username = useChatStore(s => s.username)
  const { mutateAsync, isLoading } = useMutation((payload: any) => api('/api/message', payload), {onError() {
    toast.error('Could not save.')
  }})

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const { message } = getFormData(e.target)
    if (!message.value || !username || !channelId) return

    mutateAsync({ text: message.value, username, channelId }).then(({ id }) => {
      addMessage(message.value, id)
      message.element.value = ''
    })
  }

  return <form onSubmit={onSubmit} className="flex gap-1">
    <input name="message" disabled={isLoading} className="disabled:bg-slate-200 disabled:cursor-not-allowed rounded flex-1 px-3 py-2 text-lg border-2 border-purple-700" placeholder="type your message..." />
    <button type="submit" disabled={isLoading} className="disabled:bg-purple-400 disabled:cursor-not-allowed bg-purple-600 text-white shrink-0 px-4">
      <img src={sendsvg} />
    </button>
  </form>
}
