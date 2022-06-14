import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";


const store = configureStore({
    reducer:{auth:authReducer,expenses:expensesReducer}
})


export default store