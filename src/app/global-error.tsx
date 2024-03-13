'use client';

// Error components must be Client Components

import ErrorBoundary from '@/components/ErrorsGlobalHandler/ErrorBoundary';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorBoundary error={error} reset={reset}></ErrorBoundary>;
}
