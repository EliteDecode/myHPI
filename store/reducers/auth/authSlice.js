import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authService from "./authService";
import { useEffect } from "react";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchUserData = createAsyncThunk("auth/userData", async () => {
  const userData = await AsyncStorage.getItem("userData");
  console.log(userData);
  return JSON.parse(userData);
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const data = await authService.register(user);
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

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const update = createAsyncThunk("auth/upate", async (user, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().auth.user.data._id;
    const token = thunkAPI.getState().auth.user.data.token;
    const data = await authService.update(user, userId, token);
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().auth.user.data._id;
    const token = thunkAPI.getState().auth.user.data.token;
    const data = await authService.getUser(userId, token);
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, thunkAPI) => {
    try {
      return await authService.verify(data);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      return await authService.updatePassword(data, userId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth.user.data._id;
      const token = thunkAPI.getState().auth.user.data.token;
      return await authService.deleteAccount(userId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        state.user = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Verification email sent successfully";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your profile has been updated";
        state.user = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Congratulations your profile has been updated";
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
