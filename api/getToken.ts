import type { AxiosInstance, AxiosResponse } from 'axios';
import axios, { isAxiosError } from 'axios';

const clientId = process.env.NEXT_PUBLIC_ID;
const clientSecret = process.env.NEXT_PUBLIC_SECRET;
const tokenEndpoint = process.env.NEXT_PUBLIC_TOKEN_ENDPOINT;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: tokenEndpoint,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: clientId || '',
    password: clientSecret || '',
  },
});

type TokenResponse = {
  access_token: string;
  expires_in: number;
};

export const getToken = async () => {
  const storedToken = localStorage.getItem('access_token');
  const storedTokenExpiration = localStorage.getItem('token_expiration');

  if (storedToken && storedTokenExpiration) {
    const currentTime = Date.now();
    const expirationTime = parseInt(storedTokenExpiration, 10);

    if (currentTime < expirationTime) {
      return storedToken;
    }
  }

  try {
    const response: AxiosResponse<TokenResponse> = await axiosInstance.post(
      '',
      'grant_type=client_credentials'
    );

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem('access_token', token);
    localStorage.setItem('token_expiration', expirationTime.toString());

    return token;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Generic error:', error);
    }

    throw error;
  }
};
