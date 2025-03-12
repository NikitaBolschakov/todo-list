import TaskList from './../TaskList/TaskList';
import Footer from './../Footer/Footer';
import NewTaskForm from './../NewTaskForm/NewTaskForm';
import styles from './App.module.css';
import { useState, useEffect } from 'react';

function App() {
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [tasks, setTasks] = useState([
    {
      description: 'Drink coffee',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
      timer: null, // начальное значение таймера (например, 30 минут)
      elapsedTime: 0, // текущее время выполнения
      running: false, // флаг, показывающий запущен ли таймер
      startTime: null, // время старта
    },
    {
      description: 'Order food',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
      timer: null,
      elapsedTime: 0,
      running: false,
      startTime: null,
    },
    {
      description: 'Pet the cat',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
      timer: null,
      elapsedTime: 0,
      running: false,
      startTime: null,
    },
    {
      description: 'Explore React',
      status: '',
      createdAt: new Date(),
      id: crypto.randomUUID(),
      timer: null,
      elapsedTime: 0,
      running: false,
      startTime: null,
    },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateElapsedTime();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [tasks]);

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
  const handleAddTask = (text, minutes, seconds) => {
    const newTask = {
      description: text,
      status: '', // 'active', 'completed', 'editing'
      createdAt: new Date(), // создана ...
      id: crypto.randomUUID(),
      timer: Number(minutes) * 60 + Number(seconds), // преобразуем минуты и секунды в секунды
      elapsedTime: 0, // текущее время выполнения
      running: false, // флаг, показывающий запущен ли таймер
      startTime: null, // время старта
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

  //--------------timer---------------//

  // Запуск таймера
  const startTimer = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            running: true,
            startTime: Date.now(),
          };
        }
        return task;
      })
    );
  };

  // Остановка таймера для конкретной задачи
  const stopTimer = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.running) {
          const now = Date.now();
          const newElapsedTime = task.elapsedTime + Math.floor((now - task.startTime) / 1000); // Добавляем прошедшее время
          return {
            ...task,
            running: false,
            elapsedTime: newElapsedTime,
          };
        }
        return task;
      })
    );
  };
  // Обновляем текущее время выполнения задачи
  const updateElapsedTime = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.running) {
          const now = Date.now(); // Текущее время в миллисекундах

          const passedTime = Math.floor((now - task.startTime) / 1000); // Вычисляем сколько секунд прошло с момента старта таймера
          const remainingTime = task.timer - passedTime; // Рассчитываем оставшееся время до завершения таймера

          if (task.status === 'completed') {
            return {
              ...task,
              elapsedTime: 0,
              timer: null,
              running: false,
            };
          }
          // Проверяем, задан ли таймер для данной задачи
          if (task.timer) {
            // Если оставшееся время меньше или равно нулю, таймер завершил свою работу
            if (remainingTime <= 0) {
              // Остановка таймера и сброс оставшегося времени
              return {
                ...task,
                elapsedTime: 0, // Сбрасываем время выполнения
                timer: null, // Удаляем значение таймера
                running: false, // Останавливаем таймер
              };
            }

            // Если таймер еще не завершен, обновляем оставшиеся секунды
            if (remainingTime > 0) {
              return {
                ...task,
                elapsedTime: remainingTime, // Обновляем оставшееся время
                timer: remainingTime,
                startTime: now, // Обновляем время старта для точности расчетов
              };
            }
          }

          // Если задача выполняется без установленного таймера, увеличиваем время выполнения
          const newElapsedTime = task.elapsedTime + Math.floor((now - task.startTime) / 1000);

          return {
            ...task,
            elapsedTime: newElapsedTime, // Обновляем время выполнения
            startTime: now, // Обновляем время старта для точности расчетов
          };
        }
        return task; // Если задача не активна, возвращаем её без изменений
      })
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
          startTimer={startTimer}
          stopTimer={stopTimer}
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
