import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useChatStore } from "../stores/mainStore"
import ChannelInput from "./ChannelInput"
import Channel from "./Channel"
import { api } from "../utils/api"
import { socket } from "../utils/sockets"

const clx = (ctl: Record<string, boolean>, cl: string) => {
  return [cl, Object.keys(ctl).filter(k => ctl[k]).join(' ')].join(' ')
}

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
  const onEnable = () => {
    if ("Notification" in window && window.Notification) {
      window.Notification.requestPermission()
    }
  }
  const isNotiEnabled = "Notification" in window && window.Notification && window.Notification.permission === 'granted'
  const isSupported = "Notification" in window

  // sockets to notify new messages in another channel
  useEffect(() => {
    ids.forEach(id => {
      const channel = channelsById.get(id)
      if (!channel) return
      if (!isSupported || !isNotiEnabled) return

      socket.subscribe(id).bind('invalidate:messages', () => {
        const options = {
          body: `new message in ${channel.name}`,
          image: 'https://api.dicebear.com/6.x/fun-emoji/png',
          tag: `ch-${id}`,
        }
        new Notification('ChatApp', options)
      })
    })

    return () => {
      ids.forEach(id => socket.unsubscribe(id))
    }
  }, [ids, isNotiEnabled])

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

  return <div className='container mx-auto flex gap-4 flex-col py-4 px-4'>
    <h1 className="text-3xl gap-4 flex items-center mb-6 mt-2">
      <span>Channels</span>
      <div className="flex-1" />
      {isNotiEnabled ? (
        <button className="text-lg transition-all border border-green-600 rounded px-4 text-green-700 bg-green-100">
          enabled 📡
        </button>
      ) : (
        <button
          onClick={onEnable}
          className={clx({
            "border-purple-600 text-purple-700 hover:bg-purple-100 active:bg-purple-200": isSupported,
            "border-red-600 text-red-700 bg-red-100 active:bg-red-200": !isSupported,
          }, "text-lg transition-all border rounded px-4")}>
          enable 📡
        </button>
      )}
      <button onClick={() => setCreating(true)} className="text-lg transition-all border border-purple-600 rounded px-4 text-purple-700 hover:bg-purple-100 active:bg-purple-200">
        new
      </button>
    </h1>
    {
      ids.map(id => (
        <button onClick={() => openChannel(id)} key={id} className="flex gap-2 p-2 items-center hover:bg-slate-50 transition-all bg-white shadow hover:underline active:bg-slate-100">
          <img className="h-12 rounded-full" src={"https://api.dicebear.com/6.x/icons/svg?seed=" + channelsById.get(id)?.name} />
          <span className="text-2xl truncate">{channelsById.get(id)?.name}</span>
        </button>
      ))
    }
  </div >
}
