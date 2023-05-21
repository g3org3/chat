import { getFormData } from "../utils/form"
import { useChatStore } from "../stores/mainStore"

export default function MessageInput() {
  const addMessage = useChatStore(s => s.actions.addMessage)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const { message } = getFormData(e.target)
    if (!message.value) return

    addMessage(message.value)
    message.element.value = ''
  }
  return <form onSubmit={onSubmit} className="flex">
    <input name="message" className="rounded flex-1 px-3 py-2 text-lg border-2 border-purple-700" placeholder="type your message..." />
    <button type="submit" className="hidden">send</button>
  </form>
}
