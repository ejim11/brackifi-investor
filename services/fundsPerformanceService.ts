import { fundsPerformance } from '@/axios.config';

export const getPerformanceReportsService = async () => {
  return await fundsPerformance.get('');
};
