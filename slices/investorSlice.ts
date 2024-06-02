import { createSlice } from '@reduxjs/toolkit';

// const storedToken = window.localStorage.getItem('investorToken');

const investorSlice = createSlice({
  name: 'investor',
  initialState: {
    isLoggedIn: false,
    token: '',
    maxDrawdown: 20,
    details: {
      id: '',
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
      nextOfKinName: '',
      nextOfKinEmail: '',
      nextOfKinAddress: '',
    },
  },
  reducers: {
    setInvestorToken(state, action: { payload: string }) {
      state.token = action.payload;
      localStorage.setItem('investorToken', action.payload);
    },
    setInvestorDetails(state, action) {
      if (!action.payload) {
        return;
      }
      state.details.name = action.payload.name;
      state.details.email = action.payload.email;
      state.details.id = action.payload.id;
      state.details.address = action.payload.address;
      state.details.phoneNumber = action.payload.phoneNumber;
      localStorage.setItem('investorDetails', JSON.stringify(action.payload));
    },
    updateInvestor(state, action) {
      state.token = action.payload.token;
      // state.details = action.payload.details;
    },
  },
});

export const investorAction = investorSlice.actions;

export default investorSlice.reducer;
