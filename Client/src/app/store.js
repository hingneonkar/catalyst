import { configureStore } from '@reduxjs/toolkit';
import submissionReducer from '../features/submissions/submissionSlice';

export const store = configureStore({
  reducer: {
    submissions: submissionReducer
  }
});
