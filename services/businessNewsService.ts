import { businessNews } from '@/axios.config';

export const getAllBusinessNewsService = async () => {
  return await businessNews.get('');
};
