'use client';

import { useCallback } from 'react'; 
import { removeToken } from './api';

export const useLogout = () => {
  return useCallback(() => {
    removeToken();  
  }, []);
};
