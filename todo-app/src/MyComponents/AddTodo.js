import React, { useState } from "react";

export const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dateTime, setDateTime] = useState(""); // ✅ New State for Date & Time

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc || !dateTime) {
      alert("Title, Description, and Date/Time cannot be blank");
    } else {
      props.addTodo(title, desc, dateTime); // ✅ Pass dateTime
      setTitle("");
      setDesc("");
      setDateTime(""); // ✅ Reset
    }
  };

  return (
    <div className="container my-3">
      <h3>Add a todo</h3>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Todo Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Todo Description
          </label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="form-control"
            id="desc"
          />
        </div>

        {/* ✅ New Date & Time Field */}
        <div className="mb-3">
          <label htmlFor="dateTime" className="form-label">
            Date & Time
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="form-control"
            id="dateTime"
          />
        </div>

        <button type="submit" className="btn btn-sm btn-success">
          Add Todo
        </button>
      </form>
    </div>
  );
};
