import ProfileLayout from '@/components/layout/profile/ProfileLayout';
import React from 'react';

export default async function ProfileLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full w-full max-w-[800px]">
      <ProfileLayout>{children}</ProfileLayout>
    </section>
  );
}
