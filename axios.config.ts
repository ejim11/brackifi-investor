import axios from 'axios';
export const shareholder = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL
      : process.env.NEXT_PUBLIC_PROD_BASE_URL,
});

export const reports = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ENVIROMENT === 'development'
      ? process.env.NEXT_PUBLIC_DEV_BASE_URL_2
      : process.env.NEXT_PUBLIC_PROD_BASE_URL_2,
});

// process.env.ENVIROMENT === 'development'
// ? process.env.DEV_BASE_URL
// : process.env.PROD_BASE_URL,
