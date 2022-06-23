import { Fragment, useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./DiaryComp.module.css";
import DiaryForm from "./DiaryForm";
import useSubmit from "../../hooks/useSubmit";

const DiaryComp = (props) => {
  const dateInputRef = useRef();
  const diaryInputRef = useRef();
  const [submitter] = useSubmit("diary");
  const [displayDiaryForm, setDisplayDiaryForm] = useState(false);
  const [readContent, setReadContent] = useState("");
  const [readDate, setReadDate] = useState("");

  const diaryFormHandler = () => {
    setDisplayDiaryForm((prevState) => !prevState);
  };

  const diarySubmitHandler = () => {
    const selectedDate = dateInputRef.current.value;
    const diaryContent = diaryInputRef.current.value;
    if (!selectedDate) {
      alert("Please select Date");
      return;
    }
    submitter(diaryContent, selectedDate, "POST");
    alert(`Your Diary for ${selectedDate} is Saved.`)
    diaryFormHandler();
    diaryInputRef.current.value = "";
  };

  const readDiaryHandler = async () => {
    const selectedDate = dateInputRef.current.value;
    if (!selectedDate) {
      alert("Please select Date");
      return;
    }
    const data = await submitter("", selectedDate);
    if (!data){
     alert("No record found for the given date")
    }
      setReadContent(Object.values(data)[0].content);
    setReadDate(Object.values(data)[0].date);
  };

  return (
    <Card>
      <div className={classes.date}>
        <p>Select Date</p>
        <input type={"date"} ref={dateInputRef} />
      </div>
      {displayDiaryForm ? (
        <DiaryForm
          diarySubmitHandler={diarySubmitHandler}
          diaryInputRef={diaryInputRef}
          diaryFormHandler={diaryFormHandler}
        />
      ) : readContent ? (
        <div className={classes.readDiary}>
          <h1>Date: {readDate}</h1>
          <p>{readContent}</p>
          <button onClick={setReadContent.bind("", "")} className="btn">Go Back</button>
        </div>
      ) : (
        <Fragment>
          <button className={"btn " + classes.btn} onClick={diaryFormHandler}>
            Write Diary
          </button>
          <br />
          <button className={"btn " + classes.btn} onClick={readDiaryHandler}>
            Read Diary
          </button>
        </Fragment>
      )}
    </Card>
  );
};

export default DiaryComp;
