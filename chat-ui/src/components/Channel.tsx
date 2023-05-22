import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

import { useChatStore } from "../stores/mainStore"
import { api } from "../utils/api"
import { socket } from "../utils/sockets"

import MessageInput from "./MessageInput"
import ChannelHeader from "./ChannelHeader"
import Messages from "./Messages"

export default function Channel(props: { id: string }) {
  const setActiveMessages = useChatStore(s => s.actions.setActiveMessages)
  const { refetch } = useQuery({
    queryKey: ['messages', `/api/channel/${props.id}/message`],
    queryFn: () => api(`/api/channel/${props.id}/message`),
    onSuccess: (messages) => {
      setActiveMessages(messages as never)
    }
  })

  const channelsById = useChatStore(s => s.channelsById)
  const channel = channelsById.get(props.id)

  useEffect(() => {
    socket.subscribe(props.id).bind('invalidate:messages', () => refetch())
    return () => socket.unsubscribe(props.id)
  }, [props.id])

  if (!channel) {
    return <div>
      no channel found
    </div>
  }

  return (
    <div className='container mx-auto flex flex-1 gap-2 flex-col py-2 overflow-auto'>
      <ChannelHeader name={channel.name} />
      <div className="bg-white flex-1 flex flex-col px-3 pt-3 overflow-auto">
       <Messages channelId={props.id} /> 
        <div className="flex flex-col pb-4">
          <MessageInput />
        </div>
      </div>
    </div>
  )
}
