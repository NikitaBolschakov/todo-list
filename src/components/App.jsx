import TaskList from "./TaskList";
import Footer from "./Footer";
import NewTaskForm from "./NewTaskForm";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      description: "REActive task",
      status: "",
      createdAt: new Date(),
      id: "3",
    },
    { description: "Active task", status: "", createdAt: new Date(), id: "4" },
    { description: "Active task", status: "", createdAt: new Date(), id: "5" },
    {
      description: "reactive task",
      status: "",
      createdAt: new Date(),
      id: "6",
    },
  ]);

  // Обработчик удаления задачи
  function handleDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Обработчик доб-я задачи
  function handleAddTask(text) {
    const newTask = {
      description: text,
      status: "",
      createdAt: new Date(),
      id: crypto.randomUUID(),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  // Обработчик переключения статуса задачи
  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "active" : "completed",
            }
          : task
      )
    );
  };

  // Обработчик перехода в режим редактирования
  const handleEdit = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map(
        (task) =>
          task.id === id
            ? { ...task, status: "editing" }
            : { ...task, status: "active" } // Сбрасываем редактирование у других задач
      )
    );
  };

  // Обработчик сохранения изменений в отредактированной таске
  const handleSave = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, description: newDescription, status: "active" }
          : task
      )
    );
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm handleAddTask={handleAddTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEdit}
          onSave={handleSave}
        />
        <Footer />
      </section>
    </section>
  );
}

export default App;
