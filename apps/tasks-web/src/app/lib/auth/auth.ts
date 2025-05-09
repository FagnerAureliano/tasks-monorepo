import { jwtDecode } from 'jwt-decode'

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};
export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const { sub } = jwtDecode<{ sub?: string }>(token);
    return sub ?? null;
  } catch {
    return null;
  }
};

export const getUserFromToken = <T = unknown>(): T | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
};
