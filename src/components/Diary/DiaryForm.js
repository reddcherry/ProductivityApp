import { Fragment } from "react";
import classes from "./DiaryForm.module.css";

const DiaryForm = props => {
  return (
    <Fragment>
      <textarea className={classes.textarea} ref={props.diaryInputRef} />
      <button
        className={"btn " + classes.btn}
        onClick={props.diarySubmitHandler}
      >
        Submit
      </button>
      <button className={"btn "+classes.backButton} onClick={props.diaryFormHandler} >
        Cancel
      </button>
    </Fragment>
  );
};

export default DiaryForm;
