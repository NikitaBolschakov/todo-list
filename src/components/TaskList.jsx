import Task from "./Task";

function TaskList({ tasks }) {
  const elements = tasks.map((task) => <Task {...task} key={task.id} />);

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;
