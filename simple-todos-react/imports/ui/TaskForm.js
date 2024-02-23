import React, { useState } from "react";
import { Meteor } from "meteor/meteor";


const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    Meteor.call("tasks.insert", text);
    setText("");
  };
  return (
    <form className="task-form" onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Enter your task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
