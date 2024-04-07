import { configureStore } from '@reduxjs/toolkit';
import shareholderReducer from './slices/shareholderSlice';

const store = configureStore({
  reducer: {
    shareholder: shareholderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
