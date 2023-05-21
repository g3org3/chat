import { getFormData } from "../utils/form"
import { useChatStore } from "../stores/mainStore"

export default function ChannelInput(props: { onCreate: () => void }) {
  const addChannel = useChatStore((s) => s.actions.addChannel)

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = getFormData(e.target)
    if (!form.channel?.value) return

    addChannel(form.channel.value)
    props.onCreate()
    form.channel.element.value = ''
  }

  return <form onSubmit={onSubmit}>
    <div className='flex gap-1'>
      <input name="channel" className="px-3 py-2 text-lg rounded border-2 border-purple-700" placeholder='type a channel name...' />
      <button className="transition-all bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-800 active:bg-purple-900 ring-2 ring-offset-2 ring-transparent active:ring-purple-700">create</button>
    </div>
  </form>
}
