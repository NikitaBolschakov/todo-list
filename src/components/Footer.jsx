import PropTypes from "prop-types";
import TasksFilter from "./TasksFilter";

function Footer({
  activeTasksCount,
  onClearCompleted,
  completedTaskCount,
  currentFilter,
  onFilterChange,
}) {
  const getTaskCountText = () => {
    if (activeTasksCount === 0) {
      return "Everything is done";
    } else if (activeTasksCount === 1) {
      return `${activeTasksCount} item left`;
    } else {
      return `${activeTasksCount} items left`;
    }
  };

  return (
    <footer className="footer">
      <span className="todo-count">{getTaskCountText()}</span>
      <TasksFilter
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />
      <button
        className="clear-completed"
        onClick={onClearCompleted}
        disabled={completedTaskCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  activeTasksCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  completedTasksCount: PropTypes.number,
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Footer;
