import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CheckCircle2, Circle, Trash2, Plus, Search, Filter } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTodo, setNewTodo] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')

  useEffect(() => {
    fetchTodos()
  }, [searchQuery, filterStatus, sortBy])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const params = {
        search: searchQuery,
        filter: filterStatus !== 'all' ? filterStatus : undefined,
        sort: sortBy
      }
      const response = await axios.get(`${API_URL}/todos`, { params })
      setTodos(response.data.data || [])
    } catch (error) {
      toast.error('Failed to fetch todos')
      console.error('Error fetching todos:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) {
      toast.error('Todo cannot be empty')
      return
    }

    try {
      const response = await axios.post(`${API_URL}/todos`, {
        title: newTodo,
      })
      setTodos([response.data.data, ...todos])
      setNewTodo('')
      toast.success('Todo added!')
    } catch (error) {
      toast.error('Failed to add todo')
      console.error('Error adding todo:', error.response?.data || error.message)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        completed: !completed,
      })
      setTodos(todos.map(todo =>
        todo.id === id ? response.data.data : todo
      ))
      toast.success(!completed ? 'Marked as done!' : 'Marked as pending')
    } catch (error) {
      toast.error('Failed to update todo')
      console.error('Error updating todo:', error.response?.data || error.message)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
      toast.success('Todo deleted!')
    } catch (error) {
      toast.error('Failed to delete todo')
      console.error('Error deleting todo:', error.response?.data || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Ziptrip</h1>
            <p className="text-gray-600">Your personal todo manager</p>
          </div>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
              >
                <Plus size={20} />
                Add
              </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 flex gap-2">
                <Search size={20} className="text-gray-400 mt-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search todos..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="created_at">Newest</option>
                <option value="updated_at">Recently Updated</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </form>

          {/* Todo List */}
          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">⏳</div>
                <p className="text-gray-500 mt-2">Loading todos...</p>
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No todos found.</p>
                {searchQuery || filterStatus !== 'all' ? (
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                ) : (
                  <p className="text-sm text-gray-400 mt-1">Add one above to get started!</p>
                )}
              </div>
            ) : (
              <ul className="space-y-2">
                {todos.map(todo => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group border-l-4 border-blue-400"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id, todo.completed)}
                      className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
                      title={todo.completed ? 'Mark as pending' : 'Mark as done'}
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>
                    <Link
                      to={`/todo?id=${todo.id}`}
                      className="flex-1 hover:text-blue-600 transition cursor-pointer"
                    >
                      <div
                        className={`text-lg font-medium ${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                        }`}
                      >
                        {todo.title}
                      </div>
                      {todo.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {todo.description}
                        </p>
                      )}
                      {todo.priority && (
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                            todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {todo.priority}
                          </span>
                        </div>
                      )}
                    </Link>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition flex-shrink-0"
                      title="Delete todo"
                    >
                      <Trash2 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600 flex-wrap gap-4">
                <span>📊 Total: <strong>{todos.length}</strong></span>
                <span>✅ Completed: <strong>{todos.filter(t => t.completed).length}</strong></span>
                <span>⏳ Pending: <strong>{todos.filter(t => !t.completed).length}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList
