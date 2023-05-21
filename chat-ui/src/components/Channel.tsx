import { useChatStore } from "../stores/mainStore"
import Text from "./Text"
import MessageInput from "./MessageInput"

export default function Channel(props: { id: string }) {
  const openChannel = useChatStore(s => s.actions.openChannel)
  const channelsById = useChatStore(s => s.channelsById)
  const messagesById = useChatStore(s => s.messagesById)
  const messagesIds = useChatStore(s => s.selectedMessageIds)
  const channel = channelsById.get(props.id)

  if (!channel) {
    return <div>
      no channel found
    </div>
  }

  return <div className='container mx-auto flex flex-1 gap-2 flex-col py-4 overflow-auto'>
    <h1 className="text-3xl flex items-center">
      <span>Channels / {channel.name}</span>
      <div className="flex-1" />
      <button onClick={() => openChannel(null)} className="text-lg transition-all border border-purple-600 rounded px-4 text-purple-700 hover:bg-purple-100 active:bg-purple-200">close</button>
    </h1>
    <div className="bg-white flex-1 flex flex-col px-3 pt-3 overflow-auto">
      <div className="flex flex-col flex-1 gap-1 pb-4 overflow-auto">
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
                  {d.getHours()}:{`${d.getMinutes()}`.padStart(2, '0')}
                </div>
              )}
              <div className="flex flex-col flex-1">
                {isDiff && (
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-lg">{m.username}</span>
                    <span className="text-gray-400 font-mono text-xs">{d.getHours()}:{`${d.getMinutes()}`.padStart(2, '0')}</span>
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
