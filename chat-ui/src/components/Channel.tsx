import { useChatStore } from "../stores/mainStore"
import Text from "./Text"
import MessageInput from "./MessageInput"
import { useQuery } from "@tanstack/react-query"
import { api } from "../utils/api"
import { useEffect, useRef } from "react"
import { socket } from "../utils/sockets"
import closesvg from '../icons/Close.svg'

export default function Channel(props: { id: string }) {
  const setActiveMessages = useChatStore(s => s.actions.setActiveMessages)
  const messagesRef = useRef<HTMLDivElement>(null)
  const { refetch } = useQuery({
    queryKey: [`/api/channel/${props.id}/message`],
    queryFn: () => api(`/api/channel/${props.id}/message`),
    onSuccess: (messages) => {
      setActiveMessages(messages as never)
      setTimeout(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
      }, 200)
    }
  })
  const openChannel = useChatStore(s => s.actions.openChannel)
  const channelsById = useChatStore(s => s.channelsById)
  const messagesById = useChatStore(s => s.messagesById)
  const messagesIds = useChatStore(s => s.selectedMessageIds)
  const channel = channelsById.get(props.id)

  useEffect(() => {
    socket.subscribe(props.id)
    socket.channel(props.id).bind('invalidate:messages', () => {
      refetch()
    })

    return () => {
      socket.unsubscribe(props.id)
    }
  }, [props.id])

  if (!channel) {
    return <div>
      no channel found
    </div>
  }

  return <div className='container mx-auto flex flex-1 gap-2 flex-col py-2 overflow-auto'>
    <h1 className="text-3xl flex bg-white p-2 gap-2">
      <button onClick={() => openChannel(null)} className="text-sm transition-all border border-purple-300 rounded-full px-2 text-purple-700 hover:bg-purple-100 active:bg-purple-200">
        <img className="text-purple-700" src={closesvg} />
      </button>
      <img className="ml-4 h-10" src={"https://api.dicebear.com/6.x/icons/svg?seed=" + channel.name} />
      <span>{channel.name}</span>
    </h1>
    <div className="bg-white flex-1 flex flex-col px-3 pt-3 overflow-auto">
      <div ref={messagesRef} className="flex flex-col flex-1 gap-1 pb-4 overflow-auto">
        {messagesIds.map((id, i) => {
          const m = messagesById.get(id)
          const prevId = i > 0 ? messagesIds[i - 1] : null
          const prev = prevId ? messagesById.get(prevId) : null

          if (!m) return null
          const isDiff = prev?.username !== m.username
          const d = new Date(m.createdAt)

          return (
            <div key={id} className="flex gap-2 items-center group/message">
              {isDiff ? (
                <img className="h-9 bg-slate-100 rounded-full" src={"https://api.dicebear.com/6.x/pixel-art/svg?skinColor=f5cfa0&seed=" + m.username} />
              ) : (
                <div className="w-9 font-mono transition-all text-xs flex items-center text-transparent group-hover/message:text-gray-400">
                  {`${d.getHours()}`.padStart(2, '0')}:{`${d.getMinutes()}`.padStart(2, '0')}
                </div>
              )}
              <div className="flex flex-col flex-1">
                {isDiff && (
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-lg">{m.username}</span>
                    <span className="text-gray-400 font-mono text-xs">{`${d.getHours()}`.padStart(2, '0')}:{`${d.getMinutes()}`.padStart(2, '0')}</span>
                  </div>
                )}
                <Text text={m.text} />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col pb-4">
        <MessageInput />
      </div>
    </div>
  </div>
}
