const USER_KEY = "task-tracker-username";
const TASKS_KEY = "task-tracker-tasks";

export const saveUsername = (username) => {
  localStorage.setItem(USER_KEY, username);
};

export const getUsername = () => {
  return localStorage.getItem(USER_KEY);
};

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasks = () => {
  const saved = localStorage.getItem(TASKS_KEY);
  return saved ? JSON.parse(saved) : [];
};
