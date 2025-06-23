import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDesc, setEditedDesc] = useState(todo.desc);

  const handleSave = () => {
    onEdit(todo.sno, editedTitle, editedDesc);
    setIsEditing(false);
  };

  return (
    <>
      <div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control my-1"
            />
            <input
              type="text"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className="form-control my-1"
            />
            <button
              className="btn btn-sm btn-success mx-1"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h4>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo)}
                style={{ marginRight: "10px" }}
              />
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            </h4>

            <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.desc}
            </p>

            {/* ✅ Date & Time display added here */}
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              <b>Date & Time:</b> {todo.dateTime}
            </p>

            <button
              className="btn btn-sm btn-danger mx-1"
              onClick={() => onDelete(todo)}
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
      <hr />
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    sno: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    dateTime: PropTypes.string, // ✅ Added
    completed: PropTypes.bool
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};
