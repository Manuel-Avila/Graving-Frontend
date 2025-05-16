import api from './axiosInstance';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const googleLogin = async (tokenId) => {
  const response = await api.post('/auth/google-login', { tokenId });
  return response.data;
};