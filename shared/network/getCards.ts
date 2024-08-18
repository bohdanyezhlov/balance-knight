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

type TParams = Record<string, string>;

export const getCards = async ({
  page = 1,
  manaCostParam = '',
  healthParam = '',
  attackParam = '',
  cardSetParam = 'standard',
  classParam = 'all',
  spellSchoolParam = '',
  rarityParam = '',
  keywordParam = '',
  typeParam = '',
  minionTypeParam = '',
  textFilterParam = '',
  gameModeParam = '',
  sortParam = 'manaCost:asc,name:asc,classes:asc,groupByClass:asc',
}) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const defaultParams: TParams = {
      class: classParam,
      textFilter: textFilterParam,
      manaCost: manaCostParam,
      health: healthParam,
      attack: attackParam,
      spellSchool: spellSchoolParam,
      rarity: rarityParam,
      keyword: keywordParam,
      type: typeParam,
      minionType: minionTypeParam,
      locale: 'en_US',
      page: page.toString(),
      pageSize: PAGE_SIZE.toString(),
      sort: sortParam,
    };

    if (gameModeParam) {
      defaultParams.gameMode = gameModeParam;
    } else {
      defaultParams.set = cardSetParam;
    }

    // NOTE Filter out empty or undefined values from the params object
    const validParams = Object.entries(defaultParams).reduce((acc, [key, value]) => {
      if (value !== '' && value !== undefined) {
        acc[key] = value;
      }

      return acc;
    }, {} as TParams);

    const response: AxiosResponse<TCardData> = await axiosInstance.get('', {
      params: validParams,
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
