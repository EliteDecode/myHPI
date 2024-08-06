import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import formService from "./intakeFormService";
import { useEffect } from "react";
import { logout } from "../auth/authSlice";

const initialState = {
  form: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchFormData = createAsyncThunk(
  "intakeForm/fetchFormData",
  async (id, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user.data._id;
    const formData = await AsyncStorage.getItem(`formData_${userId}`);

    return JSON.parse(formData);
  }
);

export const register_form = createAsyncThunk(
  "intakeForm/register_form",
  async (form, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await formService.register_form(form, userId, token);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error?.response?.status === "401") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const update_form = createAsyncThunk(
  "intakeForm/update_form",
  async (form, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const userHashdedId = thunkAPI.getState().form.userId;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await formService.update_form(
        form,
        userId,
        token,
        userHashdedId
      );
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error?.response?.status === "401") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const get_form = createAsyncThunk(
  "intakeForm/get_form",
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await formService.get_form(userId, token);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      if (error?.response?.status === "401") {
        thunkAPI.dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const intakeFormSlice = createSlice({
  name: "intakeForm",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register_form.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register_form.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your intakeform has been submitted";
        state.form = action.payload;
      })
      .addCase(register_form.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(update_form.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update_form.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your intakeform has been submitted";
        state.form = action.payload;
      })
      .addCase(update_form.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(get_form.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_form.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your intakeform has been gotten";
        state.form = action.payload;
      })
      .addCase(get_form.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchFormData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFormData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.form = action.payload;
      })
      .addCase(fetchFormData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = intakeFormSlice.actions;
export default intakeFormSlice.reducer;
