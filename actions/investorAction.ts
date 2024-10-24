import {
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
import calculateExpirationTime from '@/utils/calculateExpirationTime';

let logoutTimer: any;

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
      await signUp(data);
      toastSuccess('Application submitted!', iconSuccess);
      resetForm();
      setIsLoading(false);
    } catch (err: any) {
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

      // login expires an hour
      const expirationTime = new Date(new Date().getTime() + 3600 * 1000);

      // calculating the remaining time
      const remainingTime = calculateExpirationTime(
        expirationTime.toISOString()
      );

      dispatch(
        investorAction.setInvestorToken({
          token: res.data.token,
          expirationTime: expirationTime.toISOString(),
        })
      );
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

      // setting a logout timer as soon as one logs in
      logoutTimer = setTimeout(() => {
        dispatch(investorAction.autoLogoutHandler());
      }, remainingTime);

      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
  };
};

export const userLogout = () => {
  return (dispatch: any) => {
    dispatch(investorAction.logoutHandler({ logoutTimer }));
  };
};

// autologout when page is refreshed
export const autoLogout = (tokenDuration: any) => {
  return (dispatch: any) => {
    logoutTimer = setTimeout(() => {
      dispatch(investorAction.autoLogoutHandler());
    }, tokenDuration);
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
      await forgotPassword(data);
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
      await resetPassword(data, resetToken);
      setIsLoading(false);
      toastSuccess('Password reset successfully!', iconSuccess);
      resetForm();
      navFunc();
    } catch (err: any) {
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
      dispatch(
        investorAction.setInvestorDetails({
          id,
          name,
          email,
          phoneNumber,
          address,
        })
      );
      setIsLoading(false);
      toastSuccess('Updated successfully!', iconSuccess);
      resetForm();
    } catch (err: any) {
      setIsLoading(false);
      toastError(err.response.data.message, iconError);
    }
  };

export const getInvestorDispatch =
  (investorId: string, jwtToken: string) => async (dispatch: any) => {
    try {
      const res = await getInvestorService(investorId, jwtToken);
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
      // console.log(err);
    }
  };

export const updateInvestorProfileImgDispatch =
  (jwtToken: string, imgFile: any) => async (dispatch: any) => {
    try {
      const res = await updateInvestorProfileImg(jwtToken, imgFile);
      dispatch(investorAction.updateProfileImage(res.data.data.image));
    } catch (err) {
      // console.log(err);
    }
  };
