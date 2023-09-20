import axios from 'axios';

import type { CardList } from '@/types';

const baseUrl = 'https://us.api.blizzard.com/hearthstone/cards';
const PAGE_SIZE = 100;

export const getAllCards = async (page: number): Promise<CardList> => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const apiUrl = `${baseUrl}?locale=en_US&page=${page}&pageSize=${PAGE_SIZE}&set=standard&sort=manaCost:asc,name:asc,classes:asc,groupByClass:asc`;

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
