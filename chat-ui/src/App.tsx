import UsernameInput from './components/UsernameInput'
import { useChatStore } from './stores/mainStore'
import viteLogo from '/logo.svg'

function App() {
  const username = useChatStore((store => store.username))

  return (
    <main className="bg-gray-100 h-screen flex flex-col">
      <nav className="bg-white h-[48px] shadow flex flex-col">
        <div className='container mx-auto flex px-3 items-center gap-2 flex-1'>
          <img src={viteLogo} className="h-8" alt="Vite logo" />
          <span className="text-purple-800 text-lg font-bold">Chat App</span>
          <div className="flex-1" />
          {username && (
            <span className="flex items-center gap-2 capitalize font-bold">
              <img className="h-9 bg-slate-100 rounded-full" src={"https://api.dicebear.com/6.x/pixel-art/svg?seed=" + username} />
              <span>{username}</span>
            </span>
          )}
        </div>
      </nav>
      <div className='flex-1 overflow-auto'>
        <div className='container mx-auto flex gap-2 flex-col items-center py-4'>
          <h1 className="text-3xl">Please enter your username {username}</h1>
          <UsernameInput />
        </div>
      </div>
    </main>
  )
}

export default App
