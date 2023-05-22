import { getFormData } from "../utils/form"
import { useChatStore } from "../stores/mainStore"
import { toast } from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { api } from "../utils/api"

export default function MessageInput() {
  const addMessage = useChatStore(s => s.actions.addMessage)
  const channelId = useChatStore(s => s.selectedChannel)
  const username = useChatStore(s => s.username)
  const { mutateAsync } = useMutation((payload: any) => api('/api/message', payload))

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const { message } = getFormData(e.target)
    if (!message.value || !username || !channelId) return

    toast.promise(mutateAsync({ text: message.value, username, channelId }).then(({ id }) => {
      addMessage(message.value, id)
      message.element.value = ''
    }), {
      loading: 'Saving...',
      success: <b>created</b>,
      error: (e) => <b>Could not save. {e.message}</b>,
    })
  }
  return <form onSubmit={onSubmit} className="flex">
    <input name="message" className="rounded flex-1 px-3 py-2 text-lg border-2 border-purple-700" placeholder="type your message..." />
    <button type="submit" className="hidden">send</button>
  </form>
}
