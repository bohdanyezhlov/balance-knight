import type { AxiosInstance, AxiosResponse } from 'axios';
import axios, { isAxiosError } from 'axios';

import type { TCardData } from '@/types';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const cardsPath = 'cards';
const BASE_URL = `${apiEndpoint}${cardsPath}`;
const PAGE_SIZE = 100;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCards = async ({
  page = 1,
  manaCostParam = '',
  cardSetParam = 'standard',
  heroClass = 'all',
  textFilterParam = '',
  sortParam = 'manaCost:asc,name:asc,classes:asc,groupByClass:asc',
}) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response: AxiosResponse<TCardData> = await axiosInstance.get('', {
      params: {
        class: heroClass,
        textFilter: textFilterParam,
        manaCost: manaCostParam,
        locale: 'en_US',
        page: page.toString(),
        pageSize: PAGE_SIZE.toString(),
        set: cardSetParam,
        sort: sortParam,
      },
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
