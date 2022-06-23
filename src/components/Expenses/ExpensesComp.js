import Form from "../Form";
import { Fragment, useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import useSubmit from "../../hooks/useSubmit";

const ExpenseComp = () => {
  const [expenses, setExpenses] = useState([]);
  const [submitter] = useSubmit("expenses");

  const addExpense = (expense) => {
    submitter(expense, "NoDate", "POST");
    setExpenses((prevState) => [...expenses, expense]);
  };

  const asyncer = async () => {
    const data = await submitter("", "NoDate");
    setExpenses(data ? Object.values(data).map((obj) => obj.content) : []);
  };

  useEffect(() => {
   asyncer();
  }, []);

  return (
    <Fragment>
      <Form add={addExpense} type={"Expense"} />
      <ExpenseList expenses={expenses} />
    </Fragment>
  );
};

export default ExpenseComp;
