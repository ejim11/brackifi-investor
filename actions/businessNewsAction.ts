import { getAllBusinessNewsService } from '@/services/businessNewsService';
import { businessNewsActions } from '@/slices/businessNewsSlice';

export const getAllBusinessNewsDispatch =
  () =>
  async (
    dispatch: (
      arg0:
        | { payload: undefined; type: 'businessNews/setNews' }
        | { payload: any; type: 'businessNews/setNews' }
    ) => void
  ) => {
    try {
      const res = await getAllBusinessNewsService();
      dispatch(businessNewsActions.setNews(res.data.data.docs));
    } catch (err) {
      console.log(err);
    }
  };
