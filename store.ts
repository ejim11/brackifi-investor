import { configureStore } from '@reduxjs/toolkit';
import investorReducer from './slices/investorSlice';
import reportsReducer from './slices/docsAndReportsSlice';

const store = configureStore({
  reducer: {
    shareholder: investorReducer,
    reports: reportsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
