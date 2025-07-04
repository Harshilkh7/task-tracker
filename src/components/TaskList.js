import React from "react";
import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onDelete,
  onToggle,
  onEdit,
  onSaveEdit,
  editTaskId,
  editTitle,
  editDescription,
  setEditTitle,
  setEditDescription,
}) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
          onSaveEdit={onSaveEdit}
          editTaskId={editTaskId}
          editTitle={editTitle}
          editDescription={editDescription}
          setEditTitle={setEditTitle}
          setEditDescription={setEditDescription}
        />
      ))}
    </ul>
  );
}

export default TaskList;
