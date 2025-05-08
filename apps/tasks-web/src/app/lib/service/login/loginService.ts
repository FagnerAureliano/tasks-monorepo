import api, { removeToken } from "@/app/lib/auth/api";
import { getUserIdFromToken } from "@/app/lib/auth/auth";

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};
export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const loginRequest: LoginRequest = {
    email,
    password,
  }; 
  const response = await api.post<LoginResponse>("/auth/login", loginRequest);
  return response.data;
};
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<RegisterResponse> => {
  const registerRequest: RegisterRequest = {
    email,
    password,
    name,
  };
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    registerRequest
  );
  return response.data;
};
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  removeToken();
};
