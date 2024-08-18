import { useIsSsrMobileContext } from '@/contexts/IsSsrMobileContext';

import { useScreenSize } from './useScreenSize';

export const useIsMobile = () => {
  const isSsrMobile = useIsSsrMobileContext();
  const { width: windowWidth } = useScreenSize();
  const isBrowserMobile = !!windowWidth && windowWidth < 992;

  return isSsrMobile || isBrowserMobile;
};
