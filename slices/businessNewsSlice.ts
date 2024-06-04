import { createSlice } from '@reduxjs/toolkit';

export const businessNewsSlice = createSlice({
  name: 'businessNews',
  initialState: {
    news: [],
  },
  reducers: {
    setNews: (state: any, action: any) => {
      state.news = action.payload;
    },
  },
});

export const businessNewsActions = businessNewsSlice.actions;

export default businessNewsSlice.reducer;
