import axios from 'axios';

import type { TCardList } from '@/types';

const BASE_URL = 'https://us.api.blizzard.com/hearthstone/cards';
const PAGE_SIZE = 100;

export const getAllCards = async ({
  page = 1,
  manaCost = '',
  set = 'standard',
  heroClass = 'all',
  textFilter = '',
  isGroupByClass = true,
}): Promise<TCardList> => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const queryParams = new URLSearchParams({
      class: heroClass,
      textFilter,
      manaCost,
      locale: 'en_US',
      page: page.toString(),
      pageSize: PAGE_SIZE.toString(),
      set,
      sort: `manaCost:asc,name:asc,classes:asc,${isGroupByClass ? 'groupByClass:asc' : ''}`,
    });

    const cardApiUrl = `${BASE_URL}?${queryParams.toString()}`;

    const response = await axios.get(cardApiUrl, {
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
