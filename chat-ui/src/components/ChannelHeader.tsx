import { useChatStore } from '../stores/mainStore'
import closesvg from '../icons/Close.svg'

export default function ChannelHeader(props: { name: string }) {
  const openChannel = useChatStore(s => s.actions.openChannel)

  return (
    <h1 className="text-3xl flex bg-white p-2 gap-2">
      <button onClick={() => openChannel(null)} className="text-sm transition-all border border-purple-300 rounded-full px-2 text-purple-700 hover:bg-purple-100 active:bg-purple-200">
        <img className="text-purple-700" src={closesvg} />
      </button>
      <img className="ml-4 h-10" src={"https://api.dicebear.com/6.x/icons/svg?seed=" + props.name} />
      <span>{props.name}</span>
    </h1>
  )
}
