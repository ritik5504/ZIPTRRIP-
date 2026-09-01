import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeft, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function TodoDetail() {
  const [searchParams] = useSearchParams()
  const todoId = searchParams.get('id')
  
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: ''
  })

  useEffect(() => {
    if (todoId) {
      fetchTodo()
    } else {
      setLoading(false)
    }
  }, [todoId])

  const fetchTodo = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/todos/${todoId}`)
      setTodo(response.data.data)
      setEditData({
        title: response.data.data.title,
        description: response.data.data.description || '',
        priority: response.data.data.priority || 'medium',
        category: response.data.data.category || ''
      })
    } catch (error) {
      toast.error('Todo not found')
      console.error('Error fetching todo:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${API_URL}/todos/${todoId}`, editData)
      setTodo(response.data.data)
      setIsEditing(false)
      toast.success('Todo updated!')
    } catch (error) {
      toast.error('Failed to update todo')
      console.error('Error updating todo:', error.response?.data || error.message)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await axios.delete(`${API_URL}/todos/${todoId}`)
        toast.success('Todo deleted!')
        window.location.href = '/'
      } catch (error) {
        toast.error('Failed to delete todo')
        console.error('Error deleting todo:', error.response?.data || error.message)
      }
    }
  }

  const toggleComplete = async () => {
    try {
      const response = await axios.put(`${API_URL}/todos/${todoId}`, {
        completed: !todo.completed
      })
      setTodo(response.data.data)
      toast.success(response.data.data.completed ? 'Marked as done!' : 'Marked as pending')
    } catch (error) {
      toast.error('Failed to update todo')
      console.error('Error updating todo:', error.response?.data || error.message)
    }
  }

  if (!todoId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo Not Found</h1>
            <p className="text-gray-600 mb-6">No todo ID provided. Please select a todo from the list.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              <ArrowLeft size={20} />
              Back to List
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium transition"
        >
          <ArrowLeft size={20} />
          Back to List
        </Link>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">⏳</div>
              <p className="text-gray-500 mt-2">Loading todo...</p>
            </div>
          ) : !todo ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Todo Not Found</h2>
              <p className="text-gray-600 mb-6">The todo with ID "{todoId}" does not exist.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                <ArrowLeft size={20} />
                Back to List
              </Link>
            </div>
          ) : isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">Edit Todo</h1>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Work, Personal"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={toggleComplete}
                      className="text-gray-400 hover:text-blue-500 transition flex-shrink-0"
                      title={todo.completed ? 'Mark as pending' : 'Mark as done'}
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={32} className="text-green-500" />
                      ) : (
                        <Circle size={32} />
                      )}
                    </button>
                    <div>
                      <h1 className={`text-3xl font-bold ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}>
                        {todo.title}
                      </h1>
                      <p className="text-sm text-gray-500 mt-1">
                        ID: <code className="bg-gray-100 px-2 py-1 rounded">{todo.id}</code>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    title="Edit todo"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                    title="Delete todo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              {todo.description && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{todo.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
                {todo.priority && (
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className={`text-lg font-semibold ${
                      todo.priority === 'high' ? 'text-red-600' :
                      todo.priority === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </p>
                  </div>
                )}
                
                {todo.category && (
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="text-lg font-semibold text-gray-800">{todo.category}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`text-lg font-semibold ${todo.completed ? 'text-green-600' : 'text-blue-600'}`}>
                    {todo.completed ? '✅ Done' : '⏳ Pending'}
                  </p>
                </div>

                {todo.due_date && (
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(todo.due_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <p>Created: {new Date(todo.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(todo.updated_at).toLocaleString()}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoDetail
