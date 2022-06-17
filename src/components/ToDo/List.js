import Card from "../UI/Card";
import classes from "./List.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
const List = (props) => {
  console.log(props.tasks.length);

const taskList = props.tasks.map((task) => {
          return (
            <div className={classes.taskContainer} key={task.key}>
              <div className={classes.card}>{task.date}</div>
              <div className={classes.card}>{task.time}</div>
              <h4>{task.taskName}</h4>
              <button
                className={classes.card}
                onClick={props.removeTask.bind("", task.key)}
              >
                {props.feedback ? <LoadingSpinner /> : props.buttonText}
              </button>
            </div>
          );
        })

  return (
    <Card>
      <h2 className={classes.head}>{props.goalStatus}</h2>
      {props.tasks.length > 0 ? (
        taskList
      ) : (
        <h4 className={classes.head}>No {props.goalStatus}...</h4>
      )}
    </Card>
  );
};

export default List;
