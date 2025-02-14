import { useState } from "react";
import PropTypes from "prop-types";

function NewTaskForm({ handleAddTask }) {
  const [newTask, setNewTask] = useState("");

  const onLabelChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      handleAddTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={onLabelChange}
        autoFocus
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  handleAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;