import PropTypes from 'prop-types';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import styles from './../TaskList/TaskList.module.css';

function Task({
  description,
  id,
  status,
  onDelete,
  onToggleStatus,
  onEdit,
  onSave,
  createdAt,
  timer,
  elapsedTime,
  running,
  startTimer,
  stopTimer,
}) {
  const [editedText, setEditedText] = useState(description);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(id, editedText);
  };

  const handleClassesTask = (status) => {
    if (status === 'completed') {
      return styles.completed;
    } else if (status === 'editing') {
      return styles.editing;
    } else {
      return '';
    }
  };

  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  const handleStartTimer = () => {
    if (!running) {
      startTimer(id);
    }
  };

  const handleStopTimer = () => stopTimer(id);

  const handleViewTime = () => {
    const time = timer || elapsedTime; // Используем timer, если он есть, иначе elapsedTime
    const minutes = Math.floor(time / 60); // Получаем полное количество минут
    const seconds = time % 60; // Получаем оставшиеся секунды

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // Форматируем вывод
  };

  return (
    <li className={handleClassesTask(status)}>
      <div className={styles.view}>
        <input
          className={styles.toggle}
          type="checkbox"
          checked={status === 'completed'}
          onChange={() => onToggleStatus(id)}
        />
        <label>
          <span className={styles.description}>{description}</span>

          {running ? (
            <button className={`${styles.icon} ${styles.iconPause}`} onClick={handleStopTimer}></button>
          ) : (
            <button className={`${styles.icon} ${styles.iconPlay}`} onClick={handleStartTimer}></button>
          )}

          <span className={styles.timer}>{handleViewTime()}</span>

          <span className={styles.created}>{timeAgo}</span>
        </label>
        <button className={`${styles.icon} ${styles.iconEdit}`} onClick={() => onEdit(id)}></button>
        <button className={`${styles.icon} ${styles.iconDestroy}`} onClick={() => onDelete(id)}></button>
      </div>
      {status === 'editing' && (
        <form onSubmit={handleSave}>
          <input
            type="text"
            className={styles.edit}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
        </form>
      )}
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  timer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  elapsedTime: PropTypes.number, // Время выполнения
  running: PropTypes.bool,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

export default Task;
