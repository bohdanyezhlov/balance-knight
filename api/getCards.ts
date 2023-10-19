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
  healthParam = '',
  attackParam = '',
  cardSetParam = 'standard',
  heroClass = 'all',
  textFilterParam = '',
  gameModeParam = '',
  sortParam = 'manaCost:asc,name:asc,classes:asc,groupByClass:asc',
}) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const params: Record<string, string> = {
      class: heroClass,
      textFilter: textFilterParam,
      manaCost: manaCostParam,
      health: healthParam,
      attack: attackParam,
      locale: 'en_US',
      page: page.toString(),
      pageSize: PAGE_SIZE.toString(),
      sort: sortParam,
    };

    if (gameModeParam) {
      params.gameMode = gameModeParam;
    } else {
      params.set = cardSetParam;
    }

    const response: AxiosResponse<TCardData> = await axiosInstance.get('', {
      params,
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
