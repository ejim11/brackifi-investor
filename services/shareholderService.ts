import { shareholder } from '../axios.config';
import { ShareholderDetails } from '@/utils/types';

export const applyToBeShareholder = async (data: any) => {
  return await shareholder.post('/potential-shareholders', data);
};

export const login = async (data: any) => {
  return await shareholder.post('/login', data);
};

export const forgotPassword = async (data: { email: string }) => {
  return await shareholder.post('/forgotPassword', data);
};

export const resetPassword = async (
  data: {
    password: string;
    passwordConfirm: string;
  },
  resetToken: string
) => {
  return await shareholder.patch(`/resetPassword/${resetToken}`, data);
};

export const updatePassword = async (
  data: {
    passwordCurrent: string;
    newPassword: string;
    confirmNewPassword: string;
  },
  jwtToken: string
) => {
  return await shareholder.patch(`/updateMyPassword`, data, {
    headers: {
      Authorization: 'Bearer ' + jwtToken,
    },
  });
};
