import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Fetch all company accounts
export const fetchCompanyAccounts = createAsyncThunk(
  "companyAccounts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/companyaccount/allcompany");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new company account
export const createCompanyAccount = createAsyncThunk(
  "companyAccounts/create",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/companyaccount/createaccount", accountData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update an existing company account
export const updateCompanyAccount = createAsyncThunk(
  "companyAccounts/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${"/companyaccount"}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a company account
export const deleteCompanyAccount = createAsyncThunk(
  "companyAccounts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${"/companyaccount"}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Redux Slice
const companyAccountSlice = createSlice({
  name: "companyAccounts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCompanyAccount.fulfilled, (state, action) => {
        state.data.push(action.payload.account);
      })
      .addCase(updateCompanyAccount.fulfilled, (state, action) => {
        const index = state.data.findIndex(acc => acc._id === action.payload.account._id);
        if (index !== -1) state.data[index] = action.payload.account;
      })
      .addCase(deleteCompanyAccount.fulfilled, (state, action) => {
        state.data = state.data.filter(acc => acc._id !== action.payload);
      });
  },
});

export default companyAccountSlice.reducer;
