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
  manaCost = '',
  cardSet = 'standard',
  heroClass = 'all',
  textFilter = '',
  isGroupByClass = true,
}) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const response: AxiosResponse<TCardData> = await axiosInstance.get('', {
      params: {
        class: heroClass,
        textFilter,
        manaCost,
        locale: 'en_US',
        page: page.toString(),
        pageSize: PAGE_SIZE.toString(),
        set: cardSet,
        sort: `manaCost:asc,name:asc,classes:asc,${isGroupByClass ? 'groupByClass:asc' : ''}`,
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
