import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
export const rootReducer
    = combineReducers({
    loader: LoaderSlice,
})