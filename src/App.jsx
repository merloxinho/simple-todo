import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import TaskInput from './components/TaskInput'
import Task from './components/Task'
import { db } from './db/db'

function App() {
  const [tasks, setTasks] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 80,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const allTasks = await db.todos.toArray();
    allTasks.sort((a, b) => (a.position || 0) - (b.position || 0));
    setTasks(allTasks);
  };

  const addTask = async (title) => {
    const maxPosition = tasks.length > 0 
      ? Math.max(...tasks.map(t => t.position || 0)) 
      : 0;
      
    await db.todos.add({
      title,
      completed: false,
      createdAt: new Date(),
      position: maxPosition + 1
    });
    loadTasks();
  };

  const toggleTask = async (id, completed) => {
    await db.todos.update(id, { completed });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await db.todos.delete(id);
    loadTasks();
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex(t => t.id === active.id);
      const newIndex = tasks.findIndex(t => t.id === over.id);
      
      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasks);

      // Update positions in database
      await Promise.all(
        newTasks.map((task, index) => 
          db.todos.update(task.id, { position: index })
        )
      );
    }
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <div className='w-screen h-screen flex justify-center m-0'>
      <div className='h-[95%] w-full my-auto flex flex-col items-center gap-4'>
        <h1 className='text-5xl font-bold p-4 hover:animate-spin select-none'>🤓</h1>
        <TaskInput onAddTask={addTask} />
        <hr className='h-1 my-4 border-2 border-gray-200 bg-gray-200 rounded-lg w-[90%] md:w-[25%]' />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          dropAnimation={dropAnimation}
        >
          <div className="flex flex-col gap-4 w-full items-center pb-8">
            <SortableContext
              items={tasks.map(t => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default App
