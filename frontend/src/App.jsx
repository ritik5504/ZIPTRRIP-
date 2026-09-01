import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import TodoList from './pages/TodoList'
import TodoDetail from './pages/TodoDetail'

function App() {

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo" element={<TodoDetail />} />
        <Route path="*" element={<div className="text-center py-20"><h1 className="text-2xl">Page not found</h1></div>} />
      </Routes>
    </Router>
  )
}

export default App
