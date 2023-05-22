import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { Message, useChatStore } from '../stores/mainStore'
import { api } from '../utils/api'
import Text from './Text'
import { toast } from 'react-hot-toast'

const DateTime = ({ date, className }: { date: string, className?: string }) => {
  const d = new Date(date)
  const hours = `${d.getHours()}`.padStart(2, '0')
  const minutes = `${d.getMinutes()}`.padStart(2, '0')

  return (
    <span title={d.toLocaleDateString()} className={"text-gray-400 font-mono text-xs " + className}>
      {hours}:{minutes}
    </span>
  )
}

export default function MessageComponent(props: { channelId: string, isDiff: boolean, m: Message }) {
  const [isEdit, setEdit] = useState(false)
  const [value, setValue] = useState(props.m.text)
  const username = useChatStore(s => s.username)
  const { mutateAsync } = useMutation((payload: { text: string; username: string; id: string, channelId: string }) => api('/api/message/edit', payload), {
    onSuccess() {
      setEdit(false)
    }
  })

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!username) return

    toast.promise(mutateAsync({ username, text: value, id: props.m._id, channelId: props.channelId }), {
      loading: 'updating',
      success: 'updated',
      error: 'something went wrong',
    })
  }

  return <div onDoubleClick={() => username === props.m.username && setEdit(true)} className="flex gap-2 items-center group/message hover:bg-gray-50 transition-all pl-2">
    {props.isDiff ? (
      <img className="h-9 bg-slate-100 rounded-full" src={"https://api.dicebear.com/6.x/pixel-art/svg?skinColor=f5cfa0&seed=" + props.m.username} />
    ) : (
      <DateTime className="w-9 font-mono transition-all text-xs flex items-center text-transparent group-hover/message:text-gray-400" date={props.m.createdAt} />
    )}
    <div className="flex flex-col flex-1">
      {props.isDiff && (
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg">{props.m.username}</span>
          <DateTime date={props.m.createdAt} />
        </div>
      )}
      {isEdit ? (
        <form onSubmit={onSubmit} className="flex gap-2">
          <input className="flex-1 p-2" value={value} onChange={e => setValue(e.target.value)} />
          <button type="submit" className="bg-purple-800 rounded text-white shrink-0 px-4">save</button>
        </form>
      ) : (
        <Text text={props.m.text} />
      )}
    </div>
  </div>
}
