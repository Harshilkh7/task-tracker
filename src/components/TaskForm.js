import React, { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title, description, dueDate, priority);
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
    }
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

export default TaskForm;
