import { toast, Bounce } from 'react-toastify';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { LuBadgeAlert } from 'react-icons/lu';

export const fileHandler = (file: any) => {
  if (file) return URL.createObjectURL(file);
};

export const toastError = (msg: string, icon: any) => {
  toast.error(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
    style: { color: 'red' },
    progressStyle: { background: 'red' },
    icon: icon,
  });
};

export const toastSuccess = (msg: string, icon: any) => {
  toast.success(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
    style: { color: 'rgba(67, 104, 80)' },
    progressStyle: { background: 'rgba(67, 104, 80)' },
    icon: icon,
  });
};
export const isImage = (url: string) => {
  const imageExtensions = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i;
  return imageExtensions.test(url);
};

export const dateDiffInDays = (date1: number, date2: number) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffInMilliseconds = Math.abs(date2 - date1);
  return Math.round(diffInMilliseconds / oneDay);
};
