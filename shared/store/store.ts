'use client';

import { create } from 'zustand';

import type { TMetadata } from '../types/metadata.type';

type StoreData = {
  hasToken: boolean;
  metadata: TMetadata | null;
  page: number;

  setHasToken: (isAuth: boolean) => void;
  setMetadata: (metadata: TMetadata) => void;
  setPage: (page: number) => void;
};

export const useStore = create<StoreData>((set) => ({
  hasToken: false,
  metadata: null,
  page: 1,

  setHasToken: (hasToken: boolean) => set({ hasToken }),
  setMetadata: (metadata: TMetadata) => set({ metadata }),
  setPage: (page: number) => set({ page }),
}));
