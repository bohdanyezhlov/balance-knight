import axios from 'axios';

import type { CardList } from '@/types';

const baseUrl = 'https://us.api.blizzard.com/hearthstone/cards';
const PAGE_SIZE = 100;

export const getAllCards = async ({
  page = 1,
  manaCost = '',
  set = 'standard',
  heroClass = 'all',
  textFilter = '',
}): Promise<CardList> => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const apiUrl = `${baseUrl}?class=${heroClass}&textFilter=${textFilter}&manaCost=${manaCost}&locale=en_US&page=${page}&pageSize=${PAGE_SIZE}&set=${set}&sort=manaCost:asc,name:asc,classes:asc,groupByClass:asc`;

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
