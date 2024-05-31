import { createSlice } from '@reduxjs/toolkit';

const investmentSlice = createSlice({
  name: 'investment',
  initialState: {
    isOpen: false,
    investmentType: '',
    investments: [],
  },
  reducers: {
    toggleInvestmentModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setInvestmentType: (state, action) => {
      state.investmentType = action.payload;
    },
  },
});

export const investmentActions = investmentSlice.actions;

export default investmentSlice.reducer;
