import React from "react";

function TaskItem({
  task,
  onDelete,
  onToggle,
  onEdit,
  onSaveEdit,
  editTaskId,
  editTitle,
  editDescription,
  editDueDate,
  setEditTitle,
  setEditDescription,
  setEditDueDate,
}) {
  const getPriorityColor = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "orange";
    return "green";
  };

  return (
    <li className={task.completed ? "completed" : "pending"}>
      {editTaskId === task.id ? (
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
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
          />
          <button onClick={() => onSaveEdit(task.id)}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.dueDate && (
            <small>Due Date: {new Date(task.dueDate).toLocaleDateString()}</small>
          )}
          <br />
          <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
          <div>
            <span
              style={{
                backgroundColor: getPriorityColor(task.priority || "Medium"),
                color: "#fff",
                padding: "2px 6px",
                borderRadius: "4px",
                marginLeft: "5px",
              }}
            >
              {task.priority || "Medium"} Priority
            </span>
          </div>
          <div className="task-actions">
            <button onClick={() => onToggle(task.id)}>
              {task.completed ? "Mark Pending" : "Mark Completed"}
            </button>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
