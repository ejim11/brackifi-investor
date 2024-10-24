import { roiValue } from '@/axios.config';

const id = process.env.NEXT_PUBLIC_ROIVALUE_ID;

export const getRoiValueData = async () => {
  return await roiValue.get(`/${id}`);
};
