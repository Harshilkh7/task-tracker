import React from "react";

function TaskFilter({ filter, setFilter, tasks }) {
  const countTasks = (type) => {
    if (type === "Completed") return tasks.filter(t => t.completed).length;
    if (type === "Pending") return tasks.filter(t => !t.completed).length;
    return tasks.length;
  };

  return (
    <div className="filter-buttons">
      {["All", "Completed", "Pending"].map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f} ({countTasks(f)})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
