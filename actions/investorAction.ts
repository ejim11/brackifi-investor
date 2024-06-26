import {
  applyToBeInvestor,
  forgotPassword,
  login,
  resetPassword,
  updatePassword,
  updateInfo,
  signUp,
  getInvestorService,
  updateInvestorProfileImg,
} from '@/services/investorService';
import { investmentActions } from '@/slices/investmentSlice';
import { investorAction } from '@/slices/investorSlice';

export const createInvestorDispatch =
  (
    data: any,
    setIsLoading: any,
    toastSuccess: any,
    toastError: any,
    iconSuccess: any,
    iconError: any,
    resetForm: any
  ) =>
  async (dispatch: any) => {
    setIsLoading(true);
    try {
      const res = await signUp(data);
      console.log(res);
      toastSuccess('Application submitted!', iconSuccess);
      resetForm();
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
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
        image,
      } = res.data.data.investor;
      console.log(res.data.data.investor);
      dispatch(investorAction.setInvestorToken(res.data.token));
      dispatch(
        investorAction.setInvestorDetails({
          id,
          name,
          email,
          phoneNumber,
          address,
          image,
        })
      );
      dispatch(
        investmentActions.setInvestmentsList(res.data.data.investor.investments)
      );
      navFunc({ id, name });
      toastSuccess('Login successfully!', iconSuccess);
      resetForm();
      setIsLoading(false);
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
      } = res.data.data.investor;
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

export const getInvestorDispatch =
  (investorId: string, jwtToken: string) => async (dispatch: any) => {
    try {
      const res = await getInvestorService(investorId, jwtToken);
      console.log(res);
      const { name, email, id, phoneNumber, address, shareholding, image } =
        res.data.data.doc;

      dispatch(
        investorAction.setInvestorDetails({
          id,
          name,
          email,
          phoneNumber,
          address,
          shareholding,
          image,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

export const updateInvestorProfileImgDispatch =
  (jwtToken: string, imgFile: any) => async (dispatch: any) => {
    try {
      const res = await updateInvestorProfileImg(jwtToken, imgFile);
      dispatch(investorAction.updateProfileImage(res.data.data.image));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
