import { createSlice } from '@reduxjs/toolkit';

const investmentSlice = createSlice({
  name: 'investment',
  initialState: {
    isOpen: false,
    investmentType: '',
    investments: [],
  },
  reducers: {
    toggleInvestmentModal: (state, action) => {
      state.isOpen = action.payload;
    },
    setInvestmentType: (state, action) => {
      state.investmentType = action.payload;
    },
    createInvestment: (state: any, action: { payload: any }) => {
      if (action.payload) {
        state.investments.push(action.payload);

        localStorage.setItem('investments', JSON.stringify(state.investments));
      }
    },
    setInvestmentsList: (state: any, action: any) => {
      state.investments = [...action.payload];
      localStorage.setItem('investments', JSON.stringify(action.payload));
    },
    updateInvestmentItem: (
      state: any,
      action: { payload: { id: string; investment: any } | any }
    ) => {
      const itemIndex = state.investments.findIndex(
        (item: any) => item._id === action.payload.id
      );
      state.investments[itemIndex] = action.payload.investment;
    },
  },
});

export const investmentActions = investmentSlice.actions;

export default investmentSlice.reducer;
