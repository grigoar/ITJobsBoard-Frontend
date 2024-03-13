'use client';

import constants from '@/utils/constants';
import FallbackDetails from './FallbackDetails/FallbackDetails';
import SEO from '../common/SEO';

const FallbackWrapper = () => {
  const pageMeta = {
    title: 'Oops! You found a missing page!',
    description: 'Oops! It looks like this page is lost in space somewhere!',
    url: `${constants.SITE_DOMAIN}/404`,
  };

  return (
    <div className={'flex h-full w-full flex-col align-middle'}>
      <SEO pageCustomSEO={pageMeta} />
      <FallbackDetails />
    </div>
  );
};

export default FallbackWrapper;
