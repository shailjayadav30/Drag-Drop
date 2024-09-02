import { useState } from "react";

const Todo = () => {
  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && value.trim()) {
      if (editItem) {
        // Editing existing task
        const updatedTasks = tasks.map((task) =>
          task.id === editItem.id ? { ...task, title: value } : task
        );
        setTasks(updatedTasks);
        setEditItem(null);
      } else {
        // Adding a new task
        const newTask = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      setValue("");
    }
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragDrop = (status) => {
    const updatedTasks = tasks.map((item) =>
      dragTask.id === item.id ? { ...item, status } : item
    );
    setTasks(updatedTasks);
    setDragTask(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    handleDragDrop(status);
  };

  const handleEdit = (task) => {
    setEditItem(task);
    setValue(task.title);
  };

  return (
    <div className="text-gray-50 flex items-center justify-center flex-col mt-8">
      <h1 className="text-4xl mb-8">Task Manager</h1>
      <input
        onChange={handleChange}
        value={value}
        className="bg-gray-300 h-8 w-1/3 rounded p-2 text-black placeholder:text-gray-900 placeholder:text-sm mb-8"
        placeholder="Enter a Task"
        type="text"
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-start justify-between w-full max-w-4xl space-x-4 text-center">
        {/* TODO Column */}
        <div
          data-status={TODO}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          className="flex-1 h-[400px] rounded"
        >
          <h2 className="text-2xl text-gray-300 font-semibold mb-4 bg-gray-700 py-2 rounded">
            Todo
          </h2>
          {tasks
            .filter((task) => task.status === TODO)
            .map((task) => (
              <div
                key={task.id}
                onDrag={(e) => handleDrag(e, task)}
                draggable
                className="bg-gray-500 mt-2 w-[90%] flex justify-between items-center h-[30px] border hover:bg-slate-400 border-gray-300 rounded p-2 mx-auto"
              >
                {task.title}
                <div className="flex space-x-2">
                  <span onClick={() => handleEdit(task)}>✏️</span>
                  <span onClick={() => handleDelete(task.id)}>🗑️</span>
                </div>
              </div>
            ))}
        </div>

        {/* DOING Column */}
        <div
          data-status={DOING}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          className="flex-1 h-[400px] rounded"
        >
          <h2 className="text-2xl text-gray-300 font-semibold mb-4 bg-gray-700 py-2 rounded">
            Doing
          </h2>
          {tasks
            .filter((task) => task.status === DOING)
            .map((task) => (
              <div
                onDrag={(e) => handleDrag(e, task)}
                key={task.id}
                draggable
                className="bg-gray-500 mt-2 w-[90%] flex justify-between items-center h-[30px] border hover:bg-slate-400 border-gray-300 rounded p-2 mx-auto"
              >
                {task.title}
                <div className="flex space-x-2">
                  <span onClick={() => handleEdit(task)}>✏️</span>
                  <span onClick={() => handleDelete(task.id)}>🗑️</span>
                </div>
              </div>
            ))}
        </div>

        {/* DONE Column */}
        <div
          data-status={DONE}
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          className="flex-1 h-[400px] rounded"
        >
          <h2 className="text-2xl text-gray-300 font-semibold mb-4 bg-gray-700 py-2 rounded">
            Done
          </h2>
          {tasks
            .filter((task) => task.status === DONE)
            .map((task) => (
              <div
                onDrag={(e) => handleDrag(e, task)}
                key={task.id}
                draggable
                className="bg-gray-500 mt-2 w-[90%] flex justify-between items-center h-[30px] border hover:bg-slate-400 border-gray-300 rounded p-2 mx-auto"
              >
                {task.title}
                <div className="flex space-x-2">
                  <span onClick={() => handleEdit(task)}>✏️</span>
                  <span onClick={() => handleDelete(task.id)}>🗑️</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
