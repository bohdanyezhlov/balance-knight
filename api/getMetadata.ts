import axios from 'axios';

import type { TMetadata } from '@/types';

const baseUrl = 'https://us.api.blizzard.com/hearthstone/metadata';

export const getMetadata = async (): Promise<TMetadata> => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const apiUrl = `${baseUrl}?locale=en_US`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
