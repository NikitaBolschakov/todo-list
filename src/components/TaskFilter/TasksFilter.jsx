import PropTypes from 'prop-types';
import styles from './TaskFilter.module.css';

function TasksFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  return (
    <ul className={styles.filters}>
      {filters.map(({ name, label }) => (
        <li key={name}>
          <button className={currentFilter === name ? styles.selected : ''} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}

TasksFilter.propTypes = {
  currentFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
