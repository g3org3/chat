import UsernameInput from './components/UsernameInput'
import viteLogo from '/logo.svg'

function App() {
  return (
    <main className="bg-gray-100 h-screen flex flex-col">
      <nav className="bg-white h-[48px] shadow flex flex-col">
        <div className='container mx-auto flex px-3 items-center gap-2 flex-1'>
          <img src={viteLogo} className="h-8" alt="Vite logo" />
          <span className="text-purple-800 text-lg font-bold">Chat App</span>
        </div>
      </nav>
      <div className='flex-1 overflow-auto'>
        <div className='container mx-auto flex gap-2 flex-col items-center py-4'>
          <h1 className="text-3xl">Please enter your username</h1>
         <UsernameInput />
        </div>
      </div>
    </main>
  )
}

export default App
