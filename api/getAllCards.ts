import axios from 'axios';

import type { TCardData } from '@/types';

const BASE_URL = 'https://us.api.blizzard.com/hearthstone/cards';
const PAGE_SIZE = 100;

export const getAllCards = async ({
  page = 1,
  manaCost = '',
  set = 'standard',
  heroClass = 'all',
  textFilter = '',
  isGroupByClass = true,
}): Promise<TCardData> => {
  console.log(textFilter, 'getall');
  try {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.get<TCardData>(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        class: heroClass,
        textFilter,
        manaCost,
        locale: 'en_US',
        page: page.toString(),
        pageSize: PAGE_SIZE.toString(),
        set,
        sort: `manaCost:asc,name:asc,classes:asc,${isGroupByClass ? 'groupByClass:asc' : ''}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
