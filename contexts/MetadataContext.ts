import { createContext, useContext } from 'react';

import type { TMetadata } from '@/types';

export const MetadataContext = createContext<TMetadata | null>(null);

export const useMetadataContext = () => useContext(MetadataContext);
