import { createSlice } from "@reduxjs/toolkit";


const expensesInitialState = {
    expenses:[],
    totalAmount:0
}

const expensesSlice = createSlice({
    name:'expenses',
    initialState:expensesInitialState,
    reducers:{
        addExpenses(state,action){
            state.expenses = [...action.payload]  
        },
        countTotal(state){
            let total = 0
            state.expenses.forEach(item=>{
                total += Number(item[1].amount)
            })
            state.totalAmount = total
        }
    }
})



export const expensesAction = expensesSlice.actions

export default expensesSlice.reducer