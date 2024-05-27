import { getAllReports } from '@/services/docsAndReportsService';
import { reportsAction } from '@/slices/docsAndReportsSlice';

export const getAllReportsDispatch = (setIsLoading: Function) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'reports/setReports' }) => void
  ) => {
    try {
      const res = await getAllReports();
      console.log(res);
      const { docs } = res.data.data;
      dispatch(reportsAction.setReports(docs));
      setIsLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setIsLoading(false);
    }
  };
};
