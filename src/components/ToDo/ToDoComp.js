import { Fragment, useReducer, useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import List from "./List";

const defaultObj = { tasks: [], completedTasks: [] };

const taskReducer = (state, action) => {
  if (action.type === "addTask") {
    const prevTasks = [...state.tasks];
    const currentTasks = [...prevTasks, action.newTask];
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
    return { tasks: currentTasks, completedTasks: state.completedTasks };
  }

  if (action.type === "renderOnReload") {
    return {
      tasks: action.currentTasks || [],
      completedTasks: action.completedTasks || [],
    };
  }

  if (action.type === "finishTask") {
    const prevTasks = [...state.tasks];
    const currentTasks = prevTasks.filter((task) => task.key != action.taskId);
    const completedTask = prevTasks.find((task) => task.key == action.taskId);
    const completedTasks = [...state.completedTasks, completedTask];
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    return { tasks: currentTasks, completedTasks };
  }

  if (action.type === "removeCompletedTask") {
    const prevTasks = [...state.completedTasks];
    const currentCompletedTasks = prevTasks.filter(
      (task) => task.key != action.taskId
    );
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(currentCompletedTasks)
    );
    return { tasks: state.tasks, completedTasks: currentCompletedTasks };
  }
  return defaultObj;
};

const ToDoComp = (props) => {
  const [taskList, dispatchTasksList] = useReducer(taskReducer, defaultObj);

  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    const currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    dispatchTasksList({ type: "renderOnReload", currentTasks, completedTasks });
  }, []);

  const ListChanger= (taskDetail, taskId=null, newTask=[])=>{
    setFeedback(true);
    setTimeout(()=>{
      dispatchTasksList({type: taskDetail, newTask, taskId:taskId });
      setFeedback(false);
    }, 750)
  }

  const addTask = (newTask) => {
    ListChanger("addTask",null,newTask);
  };

  const finishTask = (taskId) => {
    ListChanger("finishTask", taskId, []);
  };


  const removeCompletedTask = (taskId) => {
    ListChanger("removeCompletedTask", taskId, []);
  };

  return (
    <Fragment>
      <ToDoForm addTask={addTask} feedback={feedback} />

      <List
        tasks={taskList.tasks}
        removeTask={finishTask}
        goalStatus={"Current Goals"}
        buttonText={"Mark as Finished!"}
        feedback={feedback}
      />
      <List
        tasks={taskList.completedTasks}
        removeTask={removeCompletedTask}
        goalStatus={"Finished Goals"}
        buttonText={"Remove!"}
        feedback={feedback}
      />
    </Fragment>
  );
};

export default ToDoComp;
