import { createSlice } from '@reduxjs/toolkit';

const fundsPerformanceSlice = createSlice({
  name: 'fundsPerformance',
  initialState: {
    performanceReports: [],
  },
  reducers: {
    setPerformanceReports: (state: any, actions: { payload: any[] }) => {
      state.performanceReports = actions.payload;
    },
  },
});

export const fundsPerformanceActions = fundsPerformanceSlice.actions;

export default fundsPerformanceSlice.reducer;
