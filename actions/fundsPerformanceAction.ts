import { getPerformanceReportsService } from '@/services/fundsPerformanceService';
import { fundsPerformanceActions } from '@/slices/fundPerformanceSlice';

export const getPerformanceReportDispatch =
  () =>
  async (
    dispatch: (arg0: {
      payload: any[];
      type: 'fundsPerformance/setPerformanceReports';
    }) => void
  ) => {
    try {
      const res = await getPerformanceReportsService();
      dispatch(
        fundsPerformanceActions.setPerformanceReports(res.data.data.docs)
      );
    } catch (e) {
      console.log(e);
    }
  };
