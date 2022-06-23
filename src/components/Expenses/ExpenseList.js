import Card from "../UI/Card";
import classes from "./ExpenseList.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";
const ExpenseList = (props) => {

  const expenseList = props.expenses.map((expense) => {
    return (
      <div className={classes.expenseContainer} key={expense.key}>
        <button className={classes.card}>{expense.date}</button>
        <h4>{expense.expenseName}</h4>
        <button
          className={classes.card}
        > 
          Rs.{expense.amount}
        </button>
      </div>
    );
  });

  return (
    <Card>
      <h2 className={classes.head}>Your Expenses</h2>
      {props.expenses.length > 0 ? (
        expenseList
      ) : (
        <h4 className={classes.head}>No Expenses...</h4>
      )}
    </Card>
  );
};

export default ExpenseList;
