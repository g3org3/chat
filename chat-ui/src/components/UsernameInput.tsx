import { useMutation } from "@tanstack/react-query"

import { getFormData } from "../utils/form"
import { api } from '../utils/api'
import { useChatStore } from "../stores/mainStore"
import { toast } from "react-hot-toast"

export default function UsernameInput() {
  const setUsername = useChatStore((s) => s.actions.setUsername)
  const { mutateAsync, isLoading } = useMutation((username: string) => api('/api/user', { username }))

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = getFormData(e.target)
    if (!form.username?.value) return

    toast.promise(mutateAsync(form.username.value).then(() => {
      setUsername(form.username.value)
      form.username.element.value = ''
    }), {
      loading: 'Saving...',
      success: <b>created</b>,
      error: <b>Could not save.</b>,
    })
  }

  return <form onSubmit={onSubmit}>
    <div className='flex gap-1'>
      <input disabled={isLoading} name="username" className="px-3 py-2 text-lg rounded border-2 border-purple-700" placeholder='type your username...' />
      <button disabled={isLoading} className="transition-all bg-purple-700 text-white px-4 py-2 rounded shadow hover:bg-purple-800 active:bg-purple-900 ring-2 ring-offset-2 ring-transparent active:ring-purple-700">enter</button>
    </div>
  </form>
}
