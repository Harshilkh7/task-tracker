import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { saveUsername, getUsername, saveTasks, getTasks } from "./utils/localStorage";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";

function App() {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedUser = getUsername();
    if (savedUser) setUsername(savedUser);
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleLogin = (inputUser) => {
    if (!inputUser.trim()) return;
    setUsername(inputUser);
    saveUsername(inputUser);
  };

  const handleAddTask = (title, description, dueDate, priority) => {
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || "");
    setEditPriority(task.priority || "Medium");
  };

  const handleSaveEdit = (id) => {
    if (!editTitle.trim()) return;
    setTasks(tasks.map((task) =>
      task.id === id
        ? { ...task, title: editTitle, description: editDescription, dueDate: editDueDate, priority: editPriority }
        : task
    ));
    setEditTaskId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      (filter === "All") ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!username) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="dark-mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark Mode
        </label>
      </div>

      <h1>{username}'s Task Tracker</h1>
      <TaskForm onAdd={handleAddTask} />
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <TaskFilter filter={filter} setFilter={setFilter} tasks={tasks} />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggle={handleToggleComplete}
        onEdit={handleEditTask}
        onSaveEdit={handleSaveEdit}
        editTaskId={editTaskId}
        editTitle={editTitle}
        editDescription={editDescription}
        editDueDate={editDueDate}
        editPriority={editPriority}
        setEditTitle={setEditTitle}
        setEditDescription={setEditDescription}
        setEditDueDate={setEditDueDate}
        setEditPriority={setEditPriority}
      />
    </div>
  );
}

export default App;