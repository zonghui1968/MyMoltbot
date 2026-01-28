'use client';

import { Todo } from '@/types/todo';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const priorityColors = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-red-100 text-red-700 border-red-200',
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  return (
    <div
      className={`
        group flex items-center gap-4 p-4 bg-white rounded-xl border-2 
        transition-all duration-300 ease-out
        ${todo.completed ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}
        ${isDeleting ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}
      `}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`
          flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200
          ${todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-gray-300 hover:border-emerald-400'
          }
        `}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-lg font-medium transition-all duration-200
            ${todo.completed
              ? 'text-gray-400 line-through'
              : 'text-gray-800'
            }
          `}
        >
          {todo.text}
        </p>

        {/* Priority Badge */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`
              px-2 py-0.5 text-xs font-semibold rounded-md border
              ${priorityColors[todo.priority]}
            `}
          >
            {todo.priority.toUpperCase()}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(todo.createdAt).toLocaleDateString('zh-CN')}
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="
          flex-shrink-0 p-2 text-gray-400 hover:text-red-500
          hover:bg-red-50 rounded-lg transition-all duration-200
          opacity-0 group-hover:opacity-100
          focus:opacity-100
        "
        aria-label="Delete todo"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
