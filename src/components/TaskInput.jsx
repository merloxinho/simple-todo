import React, { useState } from 'react'

const MAX_LENGTH = 24;

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setTitle(value);
    }
  };

  return (
    <div className="relative w-[90%] md:w-[25%]">
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-2 px-4 h-16 gap-2 flex items-center justify-center border-2 border-gray-200'>
        <input 
          value={title}
          onChange={handleChange}
          placeholder='Enter a task...' 
          type="text" 
          maxLength={MAX_LENGTH}
          className='text-xs md:text-base bg-transparent outline-none w-full' 
        />
        <button 
          type="submit"
          className='bg-green-500 hover:bg-green-400 text-white w-12 aspect-square rounded-full transition-colors duration-300'
        >
          +
        </button>
      </form>
      <span className={`absolute text-gray-400 font-semibold -bottom-6 right-1 text-xs transition-opacity duration-200 ${title.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
        {MAX_LENGTH - title.length} characters left
      </span>
    </div>
  )
}

export default TaskInput