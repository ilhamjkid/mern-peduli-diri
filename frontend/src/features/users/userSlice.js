import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get single user
export const getUser = createAsyncThunk("user/single", async (_, thunkAPI) => {
  try {
    return await userService.getUser();
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const register = createAsyncThunk("user/register", async (user, thunkAPI) => {
  try {
    return await userService.register(user);
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    return await userService.logout();
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
