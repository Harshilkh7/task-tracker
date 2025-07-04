import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

const LOCAL_STORAGE_TASKS_KEY = "task-tracker-tasks";
const LOCAL_STORAGE_USER_KEY = "task-tracker-username";

function App() {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (savedUser) setUsername(savedUser);
    const savedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS_KEY));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleLogin = (inputUser) => {
    if (!inputUser.trim()) return;
    setUsername(inputUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, inputUser);
  };

  const addTask = (title, description) => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id, newTitle, newDesc) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle, description: newDesc } : task));
  };

  const deleteTask = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <h1>{username}'s Task Tracker</h1>
      <TaskForm onAdd={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default App;
