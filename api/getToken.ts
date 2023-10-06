import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_ID;
const clientSecret = process.env.NEXT_PUBLIC_SECRET;
const tokenEndpoint = process.env.NEXT_PUBLIC_TOKENENDPOINT;

export const getToken = async (): Promise<string> => {
  const storedToken = localStorage.getItem('access_token');
  const storedTokenExpiration = localStorage.getItem('token_expiration');

  if (storedToken && storedTokenExpiration) {
    const currentTime = Date.now();
    const expirationTime = parseInt(storedTokenExpiration, 10);

    if (currentTime < expirationTime) {
      return storedToken;
    }
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');

  try {
    const response = await axios.post(tokenEndpoint!, data, { headers });
    const token = response.data.access_token;
    const expiresIn = response.data.expires_in;
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem('access_token', token);
    localStorage.setItem('token_expiration', expirationTime.toString());

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
