import { createSlice } from '@reduxjs/toolkit';

const roiValueSlice = createSlice({
  name: 'roivalue',
  initialState: {
    value: 0,
    history: [],
    performanceCommentary: '',
    previousDayReport: {},
  },
  reducers: {
    setValue: (state: any, action: { payload: number }) => {
      state.value = action.payload;
    },
    setHistory: (state: any, action: { payload: any }) => {
      state.history = action.payload;
    },
    setPerformanceCommentary: (state: any, action: { payload: string }) => {
      state.performanceCommentary = action.payload;
    },
    setPreviousDayReport: (state: any, action: { payload: any }) => {
      state.previousDayReport = action.payload;
    },
  },
});

export const roiValueActions = roiValueSlice.actions;

export default roiValueSlice.reducer;
