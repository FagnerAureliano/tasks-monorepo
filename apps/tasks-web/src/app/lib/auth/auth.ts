export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  const payload = token.split(".")[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded.sub;
  } catch {
    return null;
  }
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  const payload = token.split(".")[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
};
