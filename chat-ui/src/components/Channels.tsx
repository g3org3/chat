import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useChatStore } from "../stores/mainStore"
import ChannelInput from "./ChannelInput"
import Channel from "./Channel"
import { api } from "../utils/api"

export default function Channels() {
  const setChannels = useChatStore(s => s.actions.setChannels)
  const { isLoading } = useQuery({
    queryKey: ['channels'],
    queryFn: () => api('/api/channel'), 
    onSuccess: (channels) => {
      setChannels(channels as never) // bad part of not using TRPC or orval
    }
  })
  const [isCreating, setCreating] = useState(false)
  const channelsById = useChatStore(s => s.channelsById)
  const ids = useChatStore(s => s.channelIds)
  const selectedChannel = useChatStore(s => s.selectedChannel)
  const openChannel = useChatStore(s => s.actions.openChannel)

  if (isLoading) {
    return <div>loading</div>
  }

  if (selectedChannel) {
    return <Channel id={selectedChannel} />
  }

  if (ids.length === 0 || isCreating) {
    return <div className='container mx-auto flex gap-2 flex-col items-start py-4'>
      <h1 className="text-3xl">Create a new channel</h1>
      <ChannelInput onCreate={() => setCreating(false)} />
    </div>
  }

  return <div className='container mx-auto flex gap-2 flex-col py-4'>
    <h1 className="text-3xl flex items-center">
      <span>Channels</span>
      <div className="flex-1" />
      <button onClick={() => setCreating(true)} className="text-lg transition-all border border-purple-600 rounded px-4 text-purple-700 hover:bg-purple-100 active:bg-purple-200">new</button>
    </h1>
    {ids.map(id => (
      <button onClick={() => openChannel(id)} key={id} className="flex gap-2 items-center hover:bg-slate-50 transition-all bg-white shadow hover:underline active:bg-slate-100">
        <img className="h-10" src={"https://api.dicebear.com/6.x/icons/svg?seed=" + channelsById.get(id)?.name} />
        <span>{channelsById.get(id)?.name}</span>
      </button>
    ))}
  </div>
}
