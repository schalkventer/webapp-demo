import { openDB } from "idb";

const dbConnection = openDB("tasks", 1, {
  upgrade: (db, oldVersion) => {
    if (oldVersion < 1) {
      db.createObjectStore("tasks", { keyPath: "id" });
    }
  },
});

const createTask = async ({ id, title, date }) => {
  const db = await dbConnection;
  db.add("tasks", {
    id,
    title,
    date,
    completed: false,
    created: new Date().getTime(),
  });
};

const readTask = async (id) => {
  const db = await dbConnection;
  if (typeof id === "string") return await db.get(id);
  if (Array.isArray(id)) return await db.getAll();

  throw new Error("Invalid ID query");
};

const updateTask = async (props) => {
  const db = await dbConnection;
  if (!props.id) throw new Error("ID required to update");

  const newTask = {
    ...(await readTask(props.id)),
    ...props,
  };

  db.put("tasks", newTask, props.id);
};

const deleteTask = async (id) => {
  const db = await dbConnection;
  db.delete("tasks", id);
};

const tasks = {
  createTask,
  readTask,
  updateTask,
  deleteTask,
};

export default tasks;
