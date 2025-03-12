import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NewTaskForm.module.css';

function NewTaskForm({ handleAddTask }) {
  const [newTask, setNewTask] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const onMinutesChange = (event) => {
    const value = event.target.value;
    // Проверка на число и ограничение до 59
    if (/^\d*$/.test(value) && (value === '' || parseInt(value, 10) <= 59)) {
      setMinutes(value); // Обновляем состояние только если введенное значение валидно
    }
  };

  const onSecondsChange = (event) => {
    const value = event.target.value;
    // Проверка на число и ограничение до 59
    if (/^\d*$/.test(value) && (value === '' || parseInt(value, 10) <= 59)) {
      setSeconds(value); // Обновляем состояние только если введенное значение валидно
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      handleAddTask(newTask.trim(), minutes, seconds);
      setNewTask('');
      setMinutes('');
      setSeconds('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.newTodoForm} action="" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
      <input className={styles.newTodo} placeholder="Task" value={newTask} onChange={onTaskChange} autoFocus />
      <input
        className={styles.newTodoForm__timer}
        type="text"
        id="minInput"
        placeholder="Min"
        value={minutes}
        onChange={onMinutesChange}
      />
      <input
        className={styles.newTodoForm__timer}
        type="text"
        id="secInput"
        placeholder="Sec"
        value={seconds}
        onChange={onSecondsChange}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  handleAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
