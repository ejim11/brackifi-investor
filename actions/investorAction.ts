import {
  applyToBeInvestor,
  forgotPassword,
  login,
  resetPassword,
  updatePassword,
  updateInfo,
} from '@/services/investorService';
import { investorAction } from '@/slices/investorSlice';

export const applyToBeInvestorDispatch = (
  data: any,
  setIsLoading: any,
  toastSuccess: any,
  toastError: any,
  iconSuccess: any,
  iconError: any,
  resetForm: any
) => {
  return async (
    dispatch: (arg0: {
      payload: any;
      type: 'shareholder/setShareholderDetails';
    }) => void
  ) => {
    setIsLoading(true);
    try {
      await applyToBeInvestor(data);

      setIsLoading(false);
      toastSuccess('Application submitted!', iconSuccess);
      resetForm();
    } catch (err: any) {
      console.log(err);
      toastError(err.response.data.message, iconError);
      setIsLoading(false);
    }
  };
};

export const loginInvestorHandler = (
  data: any,
  setIsLoading: any,
  toastSuccess: any,
  toastError: any,
  iconSuccess: any,
  iconError: any,
  resetForm: any,
  navFunc: Function
) => {
  return async (dispatch: any) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      const {
        name,
        email,
        _id: id,
        phoneNumber,
        address,
      } = res.data.data.investor;
      setIsLoading(false);
      dispatch(investorAction.setInvestorToken(res.data.token));
      dispatch(
        investorAction.setInvestorDetails({
          id,
          name,
          email,
          phoneNumber,
          address,
        })
      );
      navFunc({ id, name });
      toastSuccess('Login successfully!', iconSuccess);
      resetForm();
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      toastError(err.response.data.message, iconError);
    }
  };
};

export const forgotPasswordDispatch =
  (
    data: { email: string },
    setIsLoading: Function,
    toastSuccess: any,
    toastError: any,
    iconSuccess: any,
    iconError: any,
    resetForm: Function
  ) =>
  async (dispatch: any) => {
    setIsLoading(true);

    try {
      const res = await forgotPassword(data);
      console.log(res);
      setIsLoading(false);
      toastSuccess('Email sent successfully!', iconSuccess);
      resetForm();
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
  };

export const resetPasswordDispatch =
  (
    data: { password: string; passwordConfirm: string },
    resetToken: string,
    setIsLoading: Function,
    toastSuccess: any,
    toastError: any,
    iconSuccess: any,
    iconError: any,
    resetForm: Function,
    navFunc: Function
  ) =>
  async (dispatch: any) => {
    setIsLoading(true);
    try {
      const res = await resetPassword(data, resetToken);
      console.log(res);
      setIsLoading(false);
      toastSuccess('Password reset successfully!', iconSuccess);
      resetForm();
      navFunc();
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
  };

export const updateMyPasswordDispatch =
  (
    data: {
      passwordCurrent: string;
      newPassword: string;
      confirmNewPassword: string;
    },
    jwtToken: string,
    setIsLoading: Function,
    toastSuccess: any,
    toastError: any,
    iconSuccess: any,
    iconError: any,
    resetForm: Function,
    logoutHandler: Function
  ) =>
  async (dispatch: any) => {
    setIsLoading(true);
    try {
      const res = await updatePassword(data, jwtToken);
      console.log(res);
      setIsLoading(false);
      toastSuccess('Password updated successfully!', iconSuccess);
      resetForm();
      logoutHandler();
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
  };

export const updateInfoDispatch =
  (
    data: any,
    jwtToken: string,
    setIsLoading: Function,
    toastSuccess: any,
    toastError: any,
    iconSuccess: any,
    iconError: any,
    resetForm: Function
  ) =>
  async (dispatch: any) => {
    setIsLoading(true);
    try {
      const res = await updateInfo(data, jwtToken);
      const {
        name,
        email,
        _id: id,
        phoneNumber,
        address,
      } = res.data.data.shareholder;
      setIsLoading(false);
      // dispatch(investorAction.setInvestorActionToken(res.data.token));
      dispatch(
        investorAction.setInvestorDetails({
          id,
          name,
          email,
          phoneNumber,
          address,
        })
      );
      // navFunc({ id, name });
      setIsLoading(false);
      toastSuccess('Updated successfully!', iconSuccess);
      resetForm();
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
  };
