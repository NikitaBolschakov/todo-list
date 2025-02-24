import TaskList from './../TaskList/TaskList';
import Footer from './../Footer/Footer';
import NewTaskForm from './../NewTaskForm/NewTaskForm';
import styles from './App.module.css';
import { useState } from 'react';

function App() {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [tasks, setTasks] = useState([
    {
      description: 'Drink coffee',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
    },
    {
      description: 'Order food',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
    },
    {
      description: 'Pet the cat',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
    },
    {
      description: 'Explore React',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
    },
  ]);

  // Для удаления выполненных задач
  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.status !== 'completed'));
  };

  // Счетчик кол-ва выполненных задач для отключения кнопки "Clear completed"
  const completedTaskCount = () => tasks.filter((task) => task.status === 'completed').length;

  // Функция для фильтрации задач
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return task.status !== 'completed'; // Вернуть активные
    if (filter === 'completed') return task.status === 'completed'; // Вернуть выполненые
    return true; // иначе оставить 'all'
  });

  // Подсчет активных задач
  const activeTasksCount = tasks.filter((task) => task.status !== 'completed').length;

  // Обработчик удаления задачи
  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Обработчик доб-я задачи
  const handleAddTask = (text) => {
    const newTask = {
      description: text,
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Обработчик переключения статуса задачи
  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'completed' ? 'active' : 'completed',
            }
          : task
      )
    );
  };

  // Обработчик перехода в режим редактирования
  const handleEdit = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map(
        (task) => (task.id === id ? { ...task, status: 'editing' } : { ...task, status: 'active' }) // Сбрасываем редактирование у других задач
      )
    );
  };

  // Обработчик сохранения изменений в отредактированной таске
  const handleSave = (id, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, description: newDescription, status: 'active' } : task))
    );
  };

  return (
    <section className={styles.todoapp}>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm handleAddTask={handleAddTask} />
      </header>
      <section className={styles.main}>
        <TaskList
          tasks={filteredTasks}
          setTasks={setTasks}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          onEdit={handleEdit}
          onSave={handleSave}
        />
        <Footer
          activeTasksCount={activeTasksCount}
          onClearCompleted={handleClearCompleted}
          completedTaskCount={completedTaskCount()}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
      </section>
    </section>
  );
}

export default App;
