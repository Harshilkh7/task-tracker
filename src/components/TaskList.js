import React, { useState } from "react";

function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = (id) => {
    onUpdate(id, editTitle, editDescription);
    setEditId(null);
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={task.completed ? "completed" : "pending"}>
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
              <div className="task-actions">
                <button onClick={() => onToggle(task.id)}>
                  {task.completed ? "Mark Pending" : "Mark Completed"}
                </button>
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
