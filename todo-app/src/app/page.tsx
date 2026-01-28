'use client';

import { useState, useEffect } from 'react';
import { Todo, Priority } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load todos:', e);
      }
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    if (todos.length > 0 || localStorage.getItem('todos')) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
      createdAt: new Date(),
      priority,
    };

    setTodos([newTodo, ...todos]);
    setInput('');
    setPriority('medium');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            To Do List
          </h1>
          <p className="text-gray-600">
            高效管理你的任务
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
              <div className="text-sm text-gray-500 mt-1">全部任务</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-3xl font-bold text-emerald-600">{stats.active}</div>
              <div className="text-sm text-gray-500 mt-1">待完成</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-400">{stats.completed}</div>
              <div className="text-sm text-gray-500 mt-1">已完成</div>
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="添加新任务..."
              className="
                w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl
                focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100
                transition-all duration-200
              "
            />
            <div className="flex gap-3">
              {/* Priority Selector */}
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all duration-200
                      ${priority === p
                        ? p === 'high'
                          ? 'bg-red-500 text-white'
                          : p === 'medium'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {p === 'high' ? '高' : p === 'medium' ? '中' : '低'}
                  </button>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={addTodo}
                disabled={!input.trim()}
                className="
                  flex-1 px-6 py-2 bg-slate-800 text-white font-semibold rounded-lg
                  hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                "
              >
                添加任务
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 bg-white rounded-xl p-1.5 shadow-sm">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${filter === f
                  ? 'bg-slate-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              {f === 'all' ? '全部' : f === 'active' ? '待完成' : '已完成'}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="space-y-3 mb-6">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg">
                {filter === 'all'
                  ? '还没有任务，添加一个吧！'
                  : filter === 'active'
                  ? '没有待完成的任务 🎉'
                  : '还没有完成任何任务'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <div className="text-center">
            <button
              onClick={clearCompleted}
              className="
                px-6 py-3 text-slate-600 hover:text-slate-800
                hover:bg-slate-100 rounded-xl transition-all duration-200
              "
            >
              清除已完成 ({stats.completed})
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-400">
          <p>数据存储在本地浏览器中</p>
        </div>
      </div>
    </div>
  );
}
