import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";

import Task from "./Task";
import TaskForm from "./TaskForm";
import FilterButton from "./FilterButton";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const [filter, setFilter] = useState(false);
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();

  const userFilter = user ? { userId: user._id } : {};

  const filterdData = { isChecked: { $ne: true } };
  const pendingOnlyFilter = { ...filterdData, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      filter ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const onCheckboxClick = (_id, isChecked) => {
    Meteor.call("tasks.setIsChecked", _id, !isChecked);
  };
  const deleteTask = (_id) => Meteor.call("tasks.remove", _id);
  return (
    <div className="app ">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List ({pendingTasksCount})</h1>
          </div>
          {user && (
            <button
              role="button"
              className="user"
              onClick={logout}
              tabIndex={0}
            >
              {user.username} 🚪
            </button>
          )}
        </div>
      </header>
      <div className="main">
        {user ? (
          <>
            <TaskForm />
            <FilterButton filter={filter} setFilter={setFilter} />
            {isLoading && <div className="loading">loading...</div>}
            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={onCheckboxClick}
                  deleteTask={deleteTask}
                />
              ))}
            </ul>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
