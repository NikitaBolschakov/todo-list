import PropTypes from "prop-types";
import Task from "./Task";

function TaskList({ tasks, ...props }) {
  return (
    <ul className="todo-list">
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
      status: PropTypes.string,
      createdAt: PropTypes.instanceOf(Date),
    })
  ).isRequired,
};

export default TaskList;
