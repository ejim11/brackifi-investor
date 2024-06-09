import { investor } from '../axios.config';
import { InvestorDetails } from '@/utils/types';

export const applyToBeInvestor = async (data: any) => {
  return await investor.post('/potential-investors', data);
};

export const login = async (data: any) => {
  return await investor.post('/login', data);
};

export const forgotPassword = async (data: { email: string }) => {
  return await investor.post('/forgotPassword', data);
};

export const resetPassword = async (
  data: {
    password: string;
    passwordConfirm: string;
  },
  resetToken: string
) => {
  return await investor.patch(`/resetPassword/${resetToken}`, data);
};

export const updatePassword = async (
  data: {
    passwordCurrent: string;
    newPassword: string;
    confirmNewPassword: string;
  },
  jwtToken: string
) => {
  return await investor.patch(`/updateMyPassword`, data, {
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
};

export const updateInfo = async (data: any, jwtToken: string) => {
  return await investor.patch(`/updateMe`, data, {
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
};

export const signUp = async (data: any) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  console.log();

  let formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('address', data.address);
  formData.append('phoneNumber', data.phoneNumber);
  formData.append('proofOfIdentity', data.proofOfIdentityFile);
  formData.append('proofOfAddress', data.proofOfAddressFile);
  formData.append('nextOfKinName', data.nextOfKinName);
  formData.append('nextOfKinEmail', data.nextOfKinEmail);
  formData.append('nextOfKinAddress', data.nextOfKinAddress);
  formData.append('password', data.password);
  formData.append('passwordConfirm', data.passwordConfirm);

  return await investor.post('/', formData, config);
};

export const getInvestorService = async (
  investorId: string,
  jwtToken: string
) => {
  return await investor.get(`/${investorId}`, {
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
};
