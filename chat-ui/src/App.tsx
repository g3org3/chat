import Channels from './components/Channels'
import UsernameInput from './components/UsernameInput'
import { useChatStore } from './stores/mainStore'
import viteLogo from '/logo.svg'

function App() {
  const setUsername = useChatStore((store => store.actions.setUsername))
  const username = useChatStore((store => store.username))

  return (
    <main className="bg-gray-100 h-screen flex flex-col overflow-auto">
      <nav className="bg-white h-[48px] shadow flex flex-col">
        <div className='container mx-auto flex px-3 items-center gap-2 flex-1'>
          <img src={viteLogo} className="h-8" alt="Vite logo" />
          <span className="text-purple-800 text-lg font-bold">Chat App</span>
          <div className="flex-1" />
          {username && (
            <button onClick={() => setUsername(null)} title="logout" className="flex items-center gap-2 capitalize font-bold hover:bg-slate-100 active:bg-slate-200 border border-transparent active:border-slate-500 px-4 py-1 rounded">
              <img className="h-9 bg-slate-100 rounded-full" src={"https://api.dicebear.com/6.x/pixel-art/svg?skinColor=f5cfa0&seed=" + username} />
              <span>{username}</span>
            </button>
          )}
        </div>
      </nav>
      <div className='flex-1 overflow-auto flex flex-col'>
        {username ? (
          <Channels />
        ) : (
          <div className='container mx-auto flex gap-2 flex-col items-center py-4'>
            <h1 className="text-3xl">Please enter your username {username}</h1>
            <UsernameInput />
          </div>
        )}
      </div>
    </main>
  )
}

export default App
