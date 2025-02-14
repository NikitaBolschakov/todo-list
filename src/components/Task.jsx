import PropTypes from "prop-types";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

function Task({
  description,
  id,
  status,
  onDelete,
  onToggleStatus,
  onEdit,
  onSave,
  createdAt,
}) {

  const [editedText, setEditedText] = useState(description);

  const handleSave = (e) => {
    e.preventDefault();
    onSave(id, editedText);
  };

  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <li className={status}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => onToggleStatus(id)}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdit(id)}></button>
        <button
          className="icon icon-destroy"
          onClick={() => onDelete(id)}
        ></button>
      </div>
      {status === "editing" && (
        <form onSubmit={handleSave}>
          <input
            type="text"
            className="edit"
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
};

export default Task;
