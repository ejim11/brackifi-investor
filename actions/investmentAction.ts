import { investmentActions } from '@/slices/investmentSlice';
import {
  createInvestmentService,
  getAllInvestmentsService,
  getTransactionsByAddress,
  makeWithdrawalRequestService,
} from '@/services/investmentServices';

// create an investment
export const createInvestmentDispatch =
  (
    data: any,
    jwtToken: string,
    resetForm: Function,
    closeModal: Function,
    setIsLoading: Function
  ) =>
  async (dispatch: Function) => {
    setIsLoading(true);
    try {
      // before you create an investment, check whether the user actually has sent the money
      const txn = await getTransactionsByAddress(data.hash);

      if (txn.from.toLowerCase() !== data.address.toLowerCase()) {
        console.log('This is not the address that made the transaction');
      }

      if (Math.round(txn.value / 1e18) !== data.amountPaid) {
        console.log('This is not the amount that was paid');
      }

      const res = await createInvestmentService(data, jwtToken);
      dispatch(investmentActions.createInvestment(res.data.data.doc));
      resetForm();
      closeModal();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

//   get all the investments from the investor
export const getAllInvestmentsDispatch =
  (jwtToken: string, investorId: string) =>
  async (
    dispatch: (
      arg0:
        | { payload: undefined; type: 'investment/setInvestmentsList' }
        | { payload: any; type: 'investment/setInvestmentsList' }
    ) => void
  ) => {
    try {
      const res = await getAllInvestmentsService(jwtToken, investorId);
      console.log('investments: ', res);
      dispatch(investmentActions.setInvestmentsList(res.data.data.docs));
    } catch (e) {
      console.log(e);
    }
  };

export const makeWithdrawalRequestDispatch =
  (
    jwtToken: string,
    investorId: string,
    investmentId: string,
    setIsLoading: Function
  ) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: 'investment/updateInvestmentItem';
    }) => void
  ) => {
    setIsLoading(true);
    try {
      const res = await makeWithdrawalRequestService(
        jwtToken,
        investorId,
        investmentId,
        { investmentState: 'withdraw pending', investmentId }
      );
      console.log(res);

      //   dispatch(investmentActions.setInvestmentsList(res.data.data.docs));
      dispatch(
        investmentActions.updateInvestmentItem({
          id: investmentId,
          investment: res.data.data.investment,
        })
      );
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
