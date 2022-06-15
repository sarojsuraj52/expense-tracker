import classes from "./ExpenseItems.module.css";

const ExpenseItems = (props) => {
  return (
    <tr className={classes["expense-tr"]}>
      <td>{props.amount}</td>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td className={classes.btns}>{props.children}</td>
    </tr>
  );
};
export default ExpenseItems;
