import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  return (
    <div className="App">
      <main className="main">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  )
}

export default App
