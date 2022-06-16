import Card from "../UI/Card";
import classes from "./HomeComp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Diary from "./Diary.jpg";
import toDo from "./toDo.jpg";
import ExpenseTracker from "./ExpenseTracker.jpg";
import { Fragment, useCallback, useEffect, useState } from "react";

const HomeComp = () => {
  const [diary, setDiary] = useState(0);
  const [toDO, setToDo] = useState(100);
  const [expense, setExpense] = useState(200);

  const goRighthandler = useCallback(() => {
    setDiary((prevState) => (prevState > -200 ? prevState - 100 : 0));
    setToDo((prevState) => (prevState > -100 ? prevState - 100 : 100));
    setExpense((prevState) => (prevState > 0 ? prevState - 100 : 200));
  }, []);

  const goLeftHandler = () => {
    setDiary((prevState) => (prevState < 0 ? prevState + 100 : -200));
    setToDo((prevState) => (prevState < 100 ? prevState + 100 : -100));
    setExpense((prevState) => (prevState < 200 ? prevState + 100 : 0));
  };

  useEffect(() => {
    const interval = setInterval(goRighthandler, 5000);

    return () => clearInterval(interval);
  }, [goRighthandler]);

  return (
    <Fragment>
      <div className={classes.imageContainer}>
        <button onClick={goLeftHandler} className={classes.left}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div
          className={classes.mainImageCont}
          style={{ transform: `translateX(${diary}%)` }}
        >
          <button className={"btn " + classes.btn}>Write Today's Diary</button>
          <img src={Diary} alt="Diary Image" className={classes.image}></img>
        </div>
        <div
          className={classes.secondImageCont}
          style={{ transform: `translate(${toDO}%, -100%)` }}
        >
          <button className={"btn " + classes.btn}>To DO List</button>
          <img src={toDo} alt="To Do Image" className={classes.image}></img>
        </div>
        <div
          className={classes.thirdImageCont}
          style={{ transform: `translate(${expense}%, -200%)` }}
        >
          <button className={"btn " + classes.btn}>Expense Tracker</button>
          <img
            src={ExpenseTracker}
            alt="Expense Tracker Image"
            className={classes.image}
          ></img>
        </div>
        <button onClick={goRighthandler} className={classes.right}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </Fragment>
  );
};

export default HomeComp;

// <div className={classes.imageContainer}>
//       <button className={classes.left}>
//         <FontAwesomeIcon icon={faChevronLeft} />
//       </button>
//       <button className={"btn " + classes.btn}>Write Today's Diary</button>
//       <img src={Diary} alt="Diary Image" className={classes.image} />
//       <button className={classes.right}>
//         <FontAwesomeIcon icon={faChevronRight} />
//       </button>
//     </div>
//     <div className={classes.imageContainer}>
//       <button className={classes.left}>
//         <FontAwesomeIcon icon={faChevronLeft} />
//       </button>
//       <button className={"btn " + classes.btn}>Write Today's Diary</button>
//       <img src={Diary} alt="Diary Image" className={classes.image} />
//       <button className={classes.right}>
//         <FontAwesomeIcon icon={faChevronRight} />
//       </button>
//     </div>
