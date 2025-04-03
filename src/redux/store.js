import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import companyAccountReducer from "./companyAccountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    transaction: transactionReducer,
    companyAccounts: companyAccountReducer,
  },
});

export default store;
