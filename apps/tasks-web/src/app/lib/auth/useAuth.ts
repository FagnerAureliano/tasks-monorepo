'use client';

import { useEffect } from 'react'; 
import { removeToken } from './api';

export const useAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      removeToken(); // Já redireciona
    }
  }, []);
};
