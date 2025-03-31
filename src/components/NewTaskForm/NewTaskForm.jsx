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
    // Разрешаем только числа или пустую строку
    if (value === '' || !isNaN(Number(value))) {
      setMinutes(value);
    }
  };

  const onSecondsChange = (event) => {
    const value = event.target.value;
    // Разрешаем только валидные числа или пустую строку
    if (value === '' || !isNaN(Number(value))) {
      const secNum = parseInt(value, 10) || 0; // Преобразуем строку в целое число (десятичное) или 0

      if (secNum >= 60) {
        const currentMins = parseInt(minutes, 10); // Получаем текущее значение минут из state
        const totalSeconds = currentMins * 60 + secNum; // общее количество сек
        const newMins = Math.floor(totalSeconds / 60); // новое количество минут
        const newSecs = totalSeconds % 60; // оставшиеся секунды

        // Сразу изменяем состояние
        setMinutes(String(newMins)); 
        setSeconds(String(newSecs));
      } else {
        setSeconds(value);
      }
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
