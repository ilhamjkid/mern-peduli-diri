import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: null,
  note: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get All Notes
export const getNotes = createAsyncThunk("note/getnotes", async (_, thunkAPI) => {
  try {
    return await noteService.getNotes();
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Create Note
export const createNote = createAsyncThunk("note/create", async (note, thunkAPI) => {
  try {
    return await noteService.createNote(note);
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Note
export const updateNote = createAsyncThunk("note/update", async (note, thunkAPI) => {
  try {
    return await noteService.updateNote(note.id, note);
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete Note
export const deleteNote = createAsyncThunk("note/delete", async (id, thunkAPI) => {
  try {
    return await noteService.deleteNote(id);
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Single Note
export const getNote = createAsyncThunk("note/getsingle", async (id, thunkAPI) => {
  try {
    return await noteService.getSingleNote(id);
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const noteSlice = createSlice({
  name: "note",
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
      // Get All Notes
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload.notes;
      })
      .addCase(getNotes.rejected, (state) => {
        state.isLoading = false;
        state.notes = null;
      })
      // Create Note
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.notes = action.payload.notes;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Note
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.notes = action.payload.notes;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.notes = action.payload.notes;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Single Note
      .addCase(getNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.note = action.payload.note;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
