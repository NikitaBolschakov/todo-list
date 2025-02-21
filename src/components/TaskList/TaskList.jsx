import PropTypes from 'prop-types';
import Task from '../Task/Task';
import styles from './TaskList.module.css';

function TaskList({ tasks, ...props }) {
  return (
    <ul className={styles.todoList}>
      {tasks.map((task) => (
        <Task key={task.id} {...task} {...props} />
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
    })
  ).isRequired,
};

export default TaskList;
