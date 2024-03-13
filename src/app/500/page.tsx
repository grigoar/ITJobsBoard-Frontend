import ErrorFallback from '@/components/ErrorsGlobalHandler/ErrorFallback/ErrorFallback';
import React from 'react';

// ! TODO: This needs more investigation. The server should redirect to this page when a 500 error occurs.
const Error500Page = () => {
  return <ErrorFallback />;
};

export default Error500Page;
