import classes from "./ExpenseItems.module.css";

const ExpenseItems = (props) => {
  return (
    <li className={classes["expense-li"]}>
      <div className={classes.amount}>$ {props.amount}</div>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.category}>{props.category}</div>
      <div className={classes.btns}>
      {props.children}
      </div>
    </li>
  );
};
export default ExpenseItems;
