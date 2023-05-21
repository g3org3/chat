import { useChatStore } from "../stores/mainStore"

export default function Channel(props: {id: string}) {
  const openChannel = useChatStore(s => s.actions.openChannel)
  const channelsById = useChatStore(s => s.channelsById)
  const channel = channelsById.get(props.id)

  if (!channel) {
    return <div>
      no channel found
    </div>
  }

  return <div className='container mx-auto flex gap-2 flex-col py-4'>
    <h1 className="text-3xl flex items-center">
      <span>Channels / {channel.name}</span>
      <div className="flex-1" />
      <button onClick={() => openChannel(null)} className="text-lg transition-all border border-purple-600 rounded px-4 text-purple-700 hover:bg-purple-100 active:bg-purple-200">close</button>
    </h1>
    <div className="bg-white flex-1 flex flex-col">
      <div className="">
      </div>
      <div>
        <input />
      </div>
    </div>
  </div>
}
