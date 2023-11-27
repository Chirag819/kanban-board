import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./Slices/AppSlice";

export const store = configureStore({
    reducer : {
        info : AppSlice
    }
})