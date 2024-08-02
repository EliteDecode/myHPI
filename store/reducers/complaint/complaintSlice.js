import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import complaintService from "./complaintService";
import { useEffect } from "react";

const initialState = {
  complaint: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  fetchError: false,
  message: "",
};

export const new_complaint = createAsyncThunk(
  "complaint/new_complaint",
  async (complaint, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await complaintService.new_complaint(
        complaint,
        userId,
        token
      );
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const med_request = createAsyncThunk(
  "complaint/med_request",
  async (request, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await complaintService.med_request(request, userId, token);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const get_complaint = createAsyncThunk(
  "complaint/get_complaint",
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await complaintService.get_complaints(userId, token);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const delete_complaint = createAsyncThunk(
  "complaint/delete_complaint",
  async (complaintId, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      const data = await complaintService.delete_complaints(
        userId,
        complaintId,
        token
      );
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const complaintSlice = createSlice({
  name: "complaint",
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
      .addCase(new_complaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(new_complaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your complaint has been sent";
        state.complaint = action.payload;
      })
      .addCase(new_complaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(med_request.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(med_request.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your request has been sent";
        state.complaint = action.payload;
      })
      .addCase(med_request.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(get_complaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_complaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your complaint has been gotten";
        state.complaint = action.payload;
      })
      .addCase(get_complaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(delete_complaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delete_complaint.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations this complaint has been deleted";
        state.complaint = action.payload;
      })
      .addCase(delete_complaint.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = complaintSlice.actions;
export default complaintSlice.reducer;
