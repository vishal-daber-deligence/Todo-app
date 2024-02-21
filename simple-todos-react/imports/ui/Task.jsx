import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const Task = ({ task, onCheckboxClick, deleteTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text || "");
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        type="checkbox"
        checked={task.isChecked}
        onClick={() => onCheckboxClick(task._id, task.isChecked)}
        readOnly
      />
      {editMode ? (
        <input
          value={updatedText}
          type="text"
          style={{ width: "100%", marginRight: "15px" }}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
      ) : (
        <span className={task.isChecked ? "task-text" : ""}>{task.text}</span>
      )}
      <button
        style={{ backgroundColor: "darkgray", marginRight: "5px" }}
        onClick={() => {
          if (editMode) Meteor.call("tasks.update", task, updatedText);
          setEditMode(!editMode);
        }}
      >
        {editMode ? "Save" : "Edit"}
      </button>
      <button
        style={{ marginLeft: "3px" }}
        onClick={() => deleteTask(task._id)}
      >
        &times;
      </button>
    </li>
  );
};

export default Task;
