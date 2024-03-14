'use client';

import React from 'react';
import Link from 'next/link';
import constants from '@/utils/constants';
import { useAppSelector } from '@/store/hooks';
import Card from '../common/Card/Card';

const ContactWrapper = () => {
  const count = useAppSelector((state) => state.counter.value);

  return (
    <section className=" flex max-w-[800px] flex-col  items-center justify-between self-center pb-0  text-xl font-semibold">
      <Card>
        {count}
        <h1 className="mb-8 text-[35px]">
          <span className="bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--color-accent-blog)] bg-clip-text font-extrabold  leading-10 text-transparent">
            {constants.SITE_NAME}
          </span>{' '}
          - Contact
        </h1>
        <ul className=" list-disc font-normal [&>li]:mb-4 [&>li]:marker:text-[color:var(--color-blogs-date)]">
          <li>
            <p>
              For any queries, information, problems encountered or business inquiries please feel free to send an email
              to improvedaybyday@gmail.com.
            </p>
          </li>
          <li>
            <p>
              We will try to respond and take the necessary steps to find a resolution as soon as possible. Thank you.
            </p>
          </li>

          <li>
            <p>
              If you didn&apos;t read the disclaimer yet, please read it now &gt;{' '}
              <Link
                href={'/disclaimer'}
                className="linkVisible font-semibold tracking-[1px] text-[var(--color-accent-blog)] underline hover:brightness-90"
              >
                Disclaimer
              </Link>
            </p>
          </li>
        </ul>
      </Card>
    </section>
  );
};

export default ContactWrapper;
