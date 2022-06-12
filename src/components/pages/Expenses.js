import React, { useState,useContext,useEffect,useCallback } from "react";
import ExpenseItems from "./ExpenseItems";
import classes from "./Expenses.module.css";
import AuthContext from "../store/auth-context";
const Expenses = (props) => {
  const [expenseInput, setExpenseInput] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [expensesData,setExpensesData] = useState([])

  const authctx = useContext(AuthContext)
  let email;
  if (authctx.email !== null) {
    email = authctx.email.replace(/[@.]/g, "");
  }

  const getData = useCallback(async()=>{
    try{const res = await fetch(`https://expense-tracker-7faf8-default-rtdb.firebaseio.com/expense${email}.json`)
    
    const data = await res.json()
    if(res.ok){
      let dataArr = []
      if(data !== null){
        dataArr = Object.entries(data)
      }
      setExpensesData(dataArr)
    }
    else{
      let errMsg = `Can't get expense`
      if(data && data.error && data.error.message){
        errMsg = data.error.message
      }
      throw new Error(errMsg)
    }
  }
    catch(err){
      alert(err)
    }
  },[email])

  useEffect(()=>{
    getData()
  },[getData])

  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setExpenseInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  let expenses
  const submitHandler = async(e) => {
    e.preventDefault();
    const enteredExpenseData = {
      amount: expenseInput.amount,
      description: expenseInput.description,
      category: expenseInput.category,
    };


    try{
      const res = await fetch(`https://expense-tracker-7faf8-default-rtdb.firebaseio.com/expense${email}.json`,{
      method:'post',
      body:JSON.stringify(enteredExpenseData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await res.json()

    if(res.ok){
      alert('Expense added')
      getData()
    }
    else{
      let errMsg = `Can't add expense`
      if(data && data.error && data.error.message){
        errMsg = data.error.message
      }
      throw new Error(errMsg)
    }
  }
    catch(err){
      alert(err)
    }
  };
  
  if(expensesData.length !== 0){
    expenses = expensesData.map((item)=>(
     <ExpenseItems key={item[0]} amount={item[1].amount} description={item[1].description} category ={item[1].category} />
   ))
  }
  

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
      {expensesData.length>0 && <div className={classes['expenses-data-container']}>
      {expenses}
      </div>}
    </section>
  );
};

export default Expenses;
