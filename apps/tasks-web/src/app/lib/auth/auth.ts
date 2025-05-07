export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  const payload = token.split('.')[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded.sub; // ou `decoded.userId` dependendo do payload
  } catch {
    return null;
  }
};

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
