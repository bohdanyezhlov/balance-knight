import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_ID;
const clientSecret = process.env.NEXT_PUBLIC_SECRET;
const tokenEndpoint = process.env.NEXT_PUBLIC_TOKENENDPOINT;

export const getToken = async (): Promise<string> => {
  const storedToken = localStorage.getItem('access_token');
  if (storedToken) {
    return storedToken;
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
    localStorage.setItem('access_token', token);

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
