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
    </main>
  )
}

export default App
