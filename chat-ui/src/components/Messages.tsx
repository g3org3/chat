import { useEffect, useRef } from "react"

import { useChatStore } from "../stores/mainStore"
import Message from "./Message"

export default function Messages(props: { channelId: string }) {
  const messagesById = useChatStore(s => s.messagesById)
  const messagesIds = useChatStore(s => s.selectedMessageIds)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messagesIds])

  return (
    <div ref={messagesRef} className="flex flex-col flex-1 gap-1 pb-4 overflow-auto">
      {messagesIds.map((id, i) => {
        const m = messagesById.get(id)
        const prevId = i > 0 ? messagesIds[i - 1] : null
        const prev = prevId ? messagesById.get(prevId) : null

        if (!m) return null
        const isDiff = prev?.username !== m.username

        return (<Message channelId={props.channelId} isDiff={isDiff} m={m} />)
      })}
    </div>
  )
}
