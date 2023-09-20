import axios from 'axios';

import type { Class } from '@/types';

export const getAllClasses = async (): Promise<Class[]> => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const apiUrl = 'https://us.api.blizzard.com/hearthstone/metadata/classes?locale=en_US';

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
