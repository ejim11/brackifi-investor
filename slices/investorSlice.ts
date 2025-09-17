import { retrieveStoredToken } from '@/utils/calculateExpirationTime';
import { createSlice } from '@reduxjs/toolkit';

// retrieving the stored token, investor details and expiration time
const tokenData: any = retrieveStoredToken();
let storedToken;
let storedDuration;
if (tokenData) {
  storedToken = tokenData.token;
  storedDuration = tokenData.duration;
}

const investorSlice = createSlice({
  name: 'investor',
  initialState: {
    isLoggedIn: !!storedToken || false,
    token: storedToken || '',
    remainingTime: storedDuration || 0,
    details: {
      id: '',
      name: '',
      email: '',
      image: '',
      address: '',
      phoneNumber: '',
      nextOfKinName: '',
      nextOfKinEmail: '',
      nextOfKinAddress: '',
      bank: '',
      accountNumber: '',
    },
  },
  reducers: {
    setInvestorToken(state: any, action: { payload: any }) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('expirationTime', action.payload.expirationTime);
      localStorage.setItem('investorToken', action.payload.token);
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
      state.details.image = action.payload.image;
      state.details.bank = action.payload.bank;
      state.details.accountNumber = action.payload.accountNumber;
      localStorage.setItem('investorDetails', JSON.stringify(action.payload));
    },
    // logout handler
    logoutHandler(state: any, action) {
      state.token = '';
      state.isLoggedIn = false;
      state.details.name = '';
      state.details.email = '';
      state.details.id = '';
      state.details.address = '';
      state.details.phoneNumber = '';
      state.details.image = '';
      state.details.bank = action.payload.bank;
      state.details.accountNumber;
      emptyLocalStorage();

      if (action.payload.logoutTimer) {
        clearTimeout(action.payload.logoutTimer);
      }
    },
    // auto logout
    autoLogoutHandler(state: any) {
      state.token = '';
      state.isLoggedIn = false;
      state.details.name = '';
      state.details.email = '';
      state.details.id = '';
      state.details.address = '';
      state.details.phoneNumber = '';
      state.details.image = '';
      state.details.bank = '';
      state.details.accountNumber = '';
      emptyLocalStorage();
    },
    updateInvestor(state, action) {
      state.token = action.payload.token;
      // state.details = action.payload.details;
    },
    updateProfileImage(state, action) {
      state.details.image = action.payload;
    },
  },
});

function emptyLocalStorage() {
  localStorage.removeItem('investorToken');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('investorDetails');
  localStorage.removeItem('investments');
}

export const investorAction = investorSlice.actions;

export default investorSlice.reducer;
