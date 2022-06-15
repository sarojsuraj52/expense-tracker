import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import expensesReducer from "./expensesReducer";
import themeReducer from "./themeReducer";


const store = configureStore({
    reducer:{auth:authReducer,expenses:expensesReducer,theme:themeReducer}
})


export default store