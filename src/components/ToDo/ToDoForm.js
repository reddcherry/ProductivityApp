import { Fragment, useRef, useState } from "react";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./ToDoForm.module.css";

const ToDoForm = (props) => {
  const taskNameRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const reminderRef = useRef();
  const [yAxis, setYAxis] = useState(-200);
  const [visibility, setVisibility] = useState("block");
  const [display, setDisplay] = useState("none");

  const formCloser = () => {
    setYAxis(-200);
    setVisibility("block");
    setTimeout(() => setDisplay("none"), 500);
  };
  const formOpener = () => {
    setVisibility("none");
    setDisplay("block");
    setYAxis(0);
  };

  const toDoSubmitHandler = (e) => {
    e.preventDefault();
    const newTask = {
      key: Date.now(),
      taskName: taskNameRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
    };
    if (Object.values(newTask).includes("")) {
      alert("please enter valid details");
      return;
    }
    props.addTask(newTask);
    setYAxis(-200);
    setTimeout(() => setDisplay("none"), 500);
    setVisibility("block");
  };

  return (
    <Fragment>
      <button
        className={"btn " + classes.addBtn}
        style={{ display: `${visibility}` }}
        onClick={formOpener}
      >
        Add Goal
      </button>
      <div
        className={classes.mainContainer}
        style={{ transform: `translateY(${yAxis}%)`, display: display }}
      >
        <Card>
          <form className={classes.input} onSubmit={toDoSubmitHandler}>
            <div className={classes.control1}>
              <label>Goal Name</label>
              <input type="text" ref={taskNameRef} />
            </div>
            <br />
            <div className={classes.control2}>
              <label>Goal Date</label>
              <input type="Date" ref={dateRef} />
              <label>Goal Time</label>
              <input type="Time" ref={timeRef} defaultValue={"0900am"} />
            </div>
            <br />
            <div>
              <input id="checkBox" type="CheckBox" ref={reminderRef} />

              <label htmlFor="checkBox"> I need a Reminder.</label>
            </div>
            <br />
            <button className="btn" onClick={toDoSubmitHandler}>
              {props.feedback?<LoadingSpinner/> :'Add Goal'}
            </button>
            <br />
            <br />
            <button type="button" className="btn" onClick={formCloser}>
              {" "}
              Close
            </button>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};

export default ToDoForm;
