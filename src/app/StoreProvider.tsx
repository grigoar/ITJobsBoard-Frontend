'use client';

import { AppStore, makeStore } from '@/store';
import { initializeCount } from '@/store/slices/counterSlice';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ count, children }: { count?: number; children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(initializeCount(count));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
