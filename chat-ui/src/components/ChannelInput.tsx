import { getFormData } from "../utils/form"
import { useChatStore } from "../stores/mainStore"
import { api } from "../utils/api"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"

export default function ChannelInput(props: { onCreate: () => void }) {
  const addChannel = useChatStore((s) => s.actions.addChannel)
  const username = useChatStore(s => s.username)
  const { mutateAsync, isLoading } = useMutation((payload: { name: string, username: string }) => api('/api/channel', payload))

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = getFormData(e.target)
    const name = form.channel?.value
    if (!name || !username) return

    toast.promise(mutateAsync({ username, name }).then(({ id }) => {
      addChannel(form.channel.value, id)
      props.onCreate()
      form.channel.element.value = ''
    }), {
      loading: 'Saving...',
      success: <b>created</b>,
      error: (e) => <b>Could not save. {e.message}</b>,
    })
  }

  return <form onSubmit={onSubmit}>
    <div className='flex gap-1'>
      <input disabled={isLoading} name="channel" className="px-3 py-2 text-lg rounded border-2 border-purple-700" placeholder='type a channel name...' />
      <button disabled={isLoading} className="transition-all bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-800 active:bg-purple-900 ring-2 ring-offset-2 ring-transparent active:ring-purple-700">create</button>
    </div>
  </form>
}
