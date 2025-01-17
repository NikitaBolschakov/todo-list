import TaskList from "./TaskList";
import Footer from "./Footer";
import NewTaskForm from "./NewTaskForm";

function App() {
  const todoData = [
    { description: "Completed tass", status: "completed", id: "created 1 seconds ago"},
    { description: "Editing task", status: "editing", id: "created 2 seconds ago" },
    { description: "Active task", status: "", id: "created 3 seconds ago" },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList tasks={todoData} />
        <Footer />
      </section>
    </section>
  );
}

export default App;
