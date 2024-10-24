import axios from 'axios';

const base =
  process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
    ? process.env.NEXT_PUBLIC_LOCAL_HOST
    : process.env.NEXT_PUBLIC_WEB_HOST;

export const investor = axios.create({
  baseURL: `${base}/api/v1/investors`,
});

export const reports = axios.create({
  baseURL: `${base}/api/v1/reports`,
});

export const investments = axios.create({
  baseURL: `${base}/api/v1/investments`,
});

export const roiValue = axios.create({
  baseURL: `${base}/api/v1/roivalue`,
});

export const fundsPerformance = axios.create({
  baseURL: `${base}/api/v1/fundPerformanceCommentaries`,
});

export const businessNews = axios.create({
  baseURL: `${base}/api/v1/business-news`,
});
