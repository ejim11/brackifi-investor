import { configureStore } from '@reduxjs/toolkit';
import investorReducer from './slices/investorSlice';
import reportsReducer from './slices/docsAndReportsSlice';
import investmentReducer from './slices/investmentSlice';
import roiValueReducer from './slices/roiValueSlice';
import fundsPerformanceReducer from './slices/fundPerformanceSlice';
import businessNewsReducer from './slices/businessNewsSlice';

const store = configureStore({
  reducer: {
    investor: investorReducer,
    reports: reportsReducer,
    investments: investmentReducer,
    roivalue: roiValueReducer,
    fundPerformance: fundsPerformanceReducer,
    businessNews: businessNewsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
