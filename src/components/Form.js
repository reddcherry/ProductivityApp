import { Fragment, useRef, useState } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";
import Card from "./UI/Card";
import classes from "./Form.module.css";

//
const Form = (props) => {
  const nameRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const amountRef = useRef();
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

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (props.type == "Expense") {
      const newExpense = {
        key: Date.now(),
        expenseName: nameRef.current.value,
        date: dateRef.current.value,
        amount: amountRef.current.value,
      };
      if (Object.values(newExpense).includes("")) {
        alert("please enter valid details");
        return;
      }
      props.add(newExpense);
    } else {
      const newTask = {
        key: Date.now(),
        taskName: nameRef.current.value,
        date: dateRef.current.value,
        time: timeRef.current.value,
      };
      if (Object.values(newTask).includes("")) {
        alert("please enter valid details");
        return;
      }
      props.add(newTask);
    }

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
        {"Add " + props.type}
      </button>
      <div
        className={classes.mainContainer}
        style={{ transform: `translateY(${yAxis}%)`, display: display }}
      >
        <Card>
          <form className={classes.input} onSubmit={formSubmitHandler}>
            <div className={classes.control1}>
              <label>{props.type + " Name"}</label>
              <input type="text" ref={nameRef} />
            </div>
            <br />
            <div className={classes.control2}>
              <label>{props.type + " Date"}</label>
              <input type="Date" ref={dateRef} />
              <label>
                {props.type == "Expense"
                  ? props.type + " Amount"
                  : props.type + " Time"}{" "}
              </label>
              {props.type == "Expense" ? (
                <input type="number" ref={amountRef} />
              ) : (
                <input type="time" ref={timeRef} />
              )}
            </div>
            <br />
            <div>
              <input id="checkBox" type="CheckBox" />

              <label htmlFor="checkBox"> I need a Reminder.</label>
            </div>
            <br />
            <button className="btn" onClick={formSubmitHandler}>
              {props.feedback ? <LoadingSpinner /> : "Add " + props.type}
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

export default Form;
