import { investmentActions } from '@/slices/investmentSlice';
import {
  createInvestmentService,
  getAllInvestmentsService,
  getTransactionsByAddress,
  makeWithdrawalRequestService,
} from '@/services/investmentServices';
import { ReactNode } from 'react';

// create an investment
export const createInvestmentDispatch =
  (
    data: any,
    jwtToken: string,
    resetForm: Function,

    setIsLoading: Function,
    toastSuccess: any,
    toastError: any,
    iconSuccess: ReactNode,
    iconError: ReactNode
  ) =>
  async (dispatch: Function) => {
    setIsLoading(true);

    try {
      // if (
      //   data.address.toLowerCase() ===
      //   '0xF2188d49351CfA84DF6c6d09eaC783BAbc09F63f'
      // ) {
      //   toastError('This is not your address');
      //   return;
      // }

      // // before you create an investment, check whether the user actually has sent the money
      // const txn = await getTransactionsByAddress(data.hash);

      // if (!txn) {
      //   toastError(`Cannot find transaction with hash, try again!`, iconError);
      //   return;
      // }

      // if (txn.from.toLowerCase() !== data.address.toLowerCase()) {
      //   toastError(
      //     'This is not the address that made the transaction',
      //     iconError
      //   );
      //   return;
      // }

      // if (Math.round(txn.value / 1e18) !== data.amountPaid) {
      //   toastError('This is not the amount that was paid', iconError);
      // }

      const res = await createInvestmentService(data, jwtToken);
      dispatch(investmentActions.createInvestment(res.data.data.doc));
      resetForm();
      toastSuccess('Deposited Successfully', iconSuccess);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toastError('Please try again!', iconError);
      setIsLoading(false);
    }
  };

//   get all the investments from the investor
export const getAllInvestmentsDispatch =
  (jwtToken: string, investorId: string, setIsLoading: Function) =>
  async (
    dispatch: (
      arg0:
        | { payload: undefined; type: 'investment/setInvestmentsList' }
        | { payload: any; type: 'investment/setInvestmentsList' }
    ) => void
  ) => {
    setIsLoading(true);
    try {
      const res = await getAllInvestmentsService(jwtToken, investorId);
      dispatch(investmentActions.setInvestmentsList(res.data.data.docs));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

export const makeWithdrawalRequestDispatch =
  (
    jwtToken: string,
    investorId: string,
    investmentId: string,
    setIsLoading: Function,
    toastSuccess: any,
    toastError: any,
    iconSuccess: ReactNode,
    iconError: ReactNode
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

      //   dispatch(investmentActions.setInvestmentsList(res.data.data.docs));
      dispatch(
        investmentActions.updateInvestmentItem({
          id: investmentId,
          investment: res.data.data.investment,
        })
      );
      toastSuccess('Withdrawal request successful', iconSuccess);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      toastSuccess('Please try again!', iconError);
      setIsLoading(false);
    }
  };
