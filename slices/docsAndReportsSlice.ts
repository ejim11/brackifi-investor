import { createSlice } from '@reduxjs/toolkit';

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    reports: [],
  },
  reducers: {
    setReports(state: any, action: any) {
      let allReports: any = [];

      action.payload.forEach((obj: { date: string | number | Date }) => {
        const updatedObj = { ...obj, date: new Date(obj.date).toDateString() };
        allReports.push(updatedObj);
      });

      state.reports = [...allReports];
    },
  },
});

export const reportsAction = reportsSlice.actions;

export default reportsSlice.reducer;
