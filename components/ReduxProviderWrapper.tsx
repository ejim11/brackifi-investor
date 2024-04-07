'use client';
import React from 'react';
import store from '@/store';
import { Provider } from 'react-redux';

const ReduxProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviderWrapper;
