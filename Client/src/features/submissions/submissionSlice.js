import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSubmission, fetchSubmissions } from './submissionAPI';

export const submitSynopsis = createAsyncThunk(
  'submissions/submitSynopsis',
  async (data) => await createSubmission(data)
);

export const getSubmissions = createAsyncThunk(
  'submissions/getSubmissions',
  async (filters) => await fetchSubmissions(filters)
);

const initialState = { submissions: [], loading: false, error: null, response: null };

const submissionSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSynopsis.pending, (state) => { state.loading = true; })
      .addCase(submitSynopsis.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(submitSynopsis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSubmissions.pending, (state) => { state.loading = true; })
      .addCase(getSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(getSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { reset } = submissionSlice.actions;
export default submissionSlice.reducer;

