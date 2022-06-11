import React, { useState } from "react";
import classes from "./Expenses.module.css";

const Expenses = () => {
  const [expenseInput, setExpenseInput] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setExpenseInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const expenseData = {
      amount: expenseInput.amount,
      description: expenseInput.description,
      category: expenseInput.category,
    };
    console.log(expenseData)
  };
  return (
    <section className={classes["expenses-container"]}>
      <form onSubmit={submitHandler} className={classes["expenses-form"]}>
        <span className={classes.heading}>Fill Expense Details</span>
        <label htmlFor="amount">Amount Spent</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={expenseInput.amount}
          onChange={changeHandler}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={expenseInput.description}
          onChange={changeHandler}
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expenseInput.category}
          onChange={changeHandler}
        >
          <option value="" hidden></option>
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Recharge">Recharge</option>
          <option value="Enjoyment">Enjoyment</option>
        </select>
        <button className={classes["expenses-submit-btn"]}>
          Submit<span> ▶</span>
        </button>
      </form>
    </section>
  );
};

export default Expenses;
