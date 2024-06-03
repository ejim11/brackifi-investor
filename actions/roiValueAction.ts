import { getRoiValueData } from '@/services/roiValueService';
import { roiValueActions } from '@/slices/roiValueSlice';

export const getRoiDetails = () => async (dispatch: any) => {
  try {
    const res = await getRoiValueData();

    const { history, value, performanceCommentary, previousDayReport } =
      res.data.data.roiValue;

    dispatch(roiValueActions.setValue(value));
    dispatch(roiValueActions.setHistory(history));
    dispatch(roiValueActions.setPerformanceCommentary(performanceCommentary));
    dispatch(roiValueActions.setPreviousDayReport(previousDayReport));
  } catch (e) {
    console.log(e);
  }
};
