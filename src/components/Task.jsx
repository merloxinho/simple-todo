import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Task = ({ task, onToggle, onDelete }) => {
  const [isNew, setIsNew] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: task.id,
    transition: {
      duration: 0,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
  };

  useEffect(() => {
    // Remove the new status after animation
    const timer = setTimeout(() => setIsNew(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsRemoving(true);
    // Wait for animation to complete before actual deletion
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onToggle(task.id, !task.completed)}
      className={`shadow-md hover:border-green-300 rounded-lg py-2 px-4 w-[90%] md:w-[25%] h-16 text-left flex items-center justify-between border-2 relative overflow-hidden cursor-pointer transition-colors duration-300 touch-none
        ${task.completed ? 'border-green-300 bg-green-500' : 'border-gray-200 bg-white'}
        ${isNew ? 'animate-task-pop-in' : ''}
        ${isRemoving ? 'animate-task-pop-out' : ''}
        ${isDragging ? 'shadow-2xl' : ''}`}
    >
      <p className={`text-xs select-none md:text-base font-semibold bg-transparent outline-none w-full transition-colors duration-300 ${task.completed ? 'line-through text-white' : 'text-gray-400'}`}>
        {task.title}
      </p>
      <button
        onClick={handleDelete}
        disabled={!task.completed}
        aria-hidden={!task.completed}
        className={`absolute right-4 bg-red-500 hover:bg-red-400 text-white w-10 aspect-square rounded-full flex items-center justify-center transition-colors duration-300
          ${task.completed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Task