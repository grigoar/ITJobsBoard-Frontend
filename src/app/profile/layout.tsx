import ProfileLayout from '@/components/layout/profile/ProfileLayout';
import React from 'react';

export default async function ProfileLayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    // <section>
    //   <ProfileHeader />
    //   {/* <nav>
    //     <ul>
    //       <li>
    //         <a href="/profile">Profile</a>
    //       </li>
    //       <li>
    //         <a href="/profile/settings">Settings</a>
    //       </li>
    //       <li>
    //         <a href="/profile/notifications">Notifications</a>
    //       </li>
    //     </ul>
    //   </nav> */}
    //   {children}
    // </section>
    <section className="h-full w-full max-w-[800px]">
      <ProfileLayout>{children}</ProfileLayout>
    </section>
  );
}
