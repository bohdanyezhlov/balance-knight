import type { AxiosResponse } from 'axios';
import axios, { isAxiosError } from 'axios';

import type { TMetadata } from '@/types';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const metadataPath = 'metadata';

const BASE_URL = `${apiEndpoint}${metadataPath}`;

export const getMetadata = async () => {
  try {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('Access token not found in localStorage');
    }

    const apiUrl = `${BASE_URL}?locale=en_US`;

    const response: AxiosResponse<TMetadata> = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Generic error:', error);
    }

    throw error;
  }
};
