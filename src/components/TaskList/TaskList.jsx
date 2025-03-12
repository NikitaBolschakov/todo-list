import PropTypes from 'prop-types';
import Task from '../Task/Task';
import styles from './TaskList.module.css';

function TaskList({ tasks, ...props }) {
  return (
    <ul className={styles.todoList}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task} // передаем всю задачу целиком
          {...props}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      timer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      elapsedTime: PropTypes.number, // Текущее время выполнения
      running: PropTypes.bool, // Флаг запущенного таймера
    })
  ).isRequired,
};

export default TaskList;
