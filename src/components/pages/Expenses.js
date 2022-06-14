import React, { useState,useEffect,useCallback } from "react";
import ExpenseItems from "./ExpenseItems";
import classes from "./Expenses.module.css";
import { useSelector,useDispatch } from "react-redux";
import { expensesAction } from "../../store/expensesReducer";
const Expenses = (props) => {
  const [expenseInput, setExpenseInput] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [isEdit,setIsEdit]= useState(false)
  const [editId,setEditId] = useState('')
  const dispatch = useDispatch()
  const expenseData = useSelector(state=> state.expenses.expenses)

  let email = useSelector(state=> state.auth.email)

  if (email !== null) {
    email = email.replace(/[@.]/g, "");
  }

  const getData = useCallback(async()=>{
    try{const res = await fetch(`https://expense-tracker-7faf8-default-rtdb.firebaseio.com/expense${email}.json`)
    
    const data = await res.json()
    if(res.ok){
      let dataArr = []
      if(data !== null){
        dataArr = Object.entries(data)
      }
      // setExpensesData(dataArr)
      dispatch(expensesAction.addExpenses(dataArr))
      dispatch(expensesAction.countTotal())
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
  },[email,dispatch])

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
  
  const editHandler = async(id)=>{
    setIsEdit(true)
    let editItem
    if(expenseData.length !== 0){
      editItem = expenseData.find(item=>(item[0]===id))
    }
    setExpenseInput({
      amount: editItem[1].amount,
      description: editItem[1].description,
      category: editItem[1].category,
    })
    setEditId(id)
    dispatch(expensesAction.countTotal())
  }

  
  const submitHandler = async(e) => {
    e.preventDefault();
    const enteredExpenseData = {
      amount: expenseInput.amount,
      description: expenseInput.description,
      category: expenseInput.category,
    };


    try{
      let res,data;
      if(isEdit === true){
        res = await fetch(`https://expense-tracker-7faf8-default-rtdb.firebaseio.com/expense${email}/${editId}.json`,{
          method:'put',
          body:JSON.stringify(enteredExpenseData),
          headers:{
            'Content-Type':'application/json'
          }
        })
      }
      else{
        res = await fetch(`https://expense-tracker-7faf8-default-rtdb.firebaseio.com/expense${email}.json`,{
          method:'post',
          body:JSON.stringify(enteredExpenseData),
          headers:{
            'Content-Type':'application/json'
          }
        })
      }
     data = await res.json()

    if(res.ok){
      alert(`${isEdit?'Expense Updated':'Expenses Added'}`)
      getData()
      setIsEdit(false)
      setExpenseInput({
        amount:'',
        description:'',
        category:','
      })
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
    dispatch(expensesAction.countTotal())
  };
  
  const deleteHandler = async(id)=>{
    const res = await fetch(`https://expense-tracker-7faf8-default-rtdb.firebaseio.com/expense${email}/${id}.json`,{
      method:'delete'
    })

    if(res.ok){
      alert('Expense deleted')
      getData()
    }
    else{
      alert('Unable to delete expense')
    }
  }
  let expenses
  if(expenseData.length !== 0){
    expenses = expenseData.map((item)=>(
     <ExpenseItems key={item[0]} amount={item[1].amount} description={item[1].description} category ={item[1].category}>
      <button onClick={()=>editHandler(item[0])}>Edit</button>
      <button onClick={()=>deleteHandler(item[0])}>Delete</button>
     </ExpenseItems>
     
   ))
  }
  

  return (
    <section className={classes["expenses-container"]}>
      <form onSubmit={submitHandler} className={classes["expenses-form"]}>
        <span className={classes.heading}>{!isEdit? 'Fill Expense Details':'Edit Expense Details'}</span>
        <label htmlFor="amount">Amount Spent</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={expenseInput.amount}
          onChange={changeHandler}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={expenseInput.description}
          onChange={changeHandler}
          required
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={expenseInput.category}
          onChange={changeHandler}
          required
        >
          <option value="" hidden></option>
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Recharge">Recharge</option>
          <option value="Enjoyment">Enjoyment</option>
        </select>
        <button className={classes["expenses-submit-btn"]}>
          {!isEdit?'Submit':'Edit'}<span> ▶</span>
        </button>
      </form>
      {expenseData.length>0 && <div className={classes['expenses-data-container']}>
      {expenses}
      </div>}
    </section>
  );
};

export default Expenses;