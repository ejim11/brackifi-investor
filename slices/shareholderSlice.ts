import { createSlice } from '@reduxjs/toolkit';

// const storedToken = window.localStorage.getItem('shareholderToken');

const shareholderSlice = createSlice({
  name: 'shareholder',
  initialState: {
    isLoggedIn: false,
    token: '',
    details: {
      id: '',
      name: '',
      email: '',
    },
  },
  reducers: {
    setShareHolderToken(state, action: { payload: string }) {
      state.token = action.payload;
      localStorage.setItem('shareholderToken', action.payload);
    },
    setShareholderDetails(state, action) {
      if (!action.payload) {
        return;
      }
      state.details.name = action.payload.name;
      state.details.email = action.payload.email;
      state.details.id = action.payload.id;
      localStorage.setItem(
        'shareholderDetails',
        JSON.stringify(action.payload)
      );
    },
    updateShareholder(state, action) {
      state.token = action.payload.token;
      // state.details = action.payload.details;
    },
  },
});

export const shareholderAction = shareholderSlice.actions;

export default shareholderSlice.reducer;
