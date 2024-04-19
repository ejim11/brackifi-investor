import { reports } from '@/axios.config';

export const getAllReports = async () => {
  return await reports.get('');
};
