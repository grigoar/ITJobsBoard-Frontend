'use client';

import React from 'react';

import constants from '@/utils/constants';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';

const FallbackDetails = () => {
  return (
    <section className={'container flex h-full w-full flex-col items-center justify-center'}>
      <div className={'fallback404Container w-[90%]'}>
        <Card className={'fallback404CardContainer flex flex-row items-start justify-start'}>
          <div className={'fallback404TextContainer flex-[1.9]'}>
            <h1 className={'fallback404Title mb-2 text-[25px] text-[var(--color-red-light-2)]'}>
              Oops! It looks like this page is lost in space!
            </h1>
            <h4 className={'fallback404Subtitle mb-2 text-[16px] font-semibold tracking-[1px]'}>
              We searched high and low, but couldn&apos;t find what you&apos;re looking for.
            </h4>
            <p className={'fallback404Paragraph text-[16px]'}>Let&apos;s find a better place for you to go.</p>
            <ul className={'fallback404List'}>
              <li>
                <Button link={`${constants.SITE_DOMAIN}`} style={`btn btn-ghost`}>
                  Go back home
                </Button>
              </li>
              <li>
                <Button
                  action={() => {
                    throw new Error('sss');
                  }}
                  style={`btn btn-ghost`}
                >
                  test
                </Button>
              </li>
            </ul>
          </div>
          <div
            className={
              'image404 flex flex-[1.2] flex-col items-center justify-center self-center text-[var(--color-red-light-2)]'
            }
          >
            <div className={'image404Text mb-2 text-[6.5rem] italic leading-[5rem]'}>404</div>
            <p>Page Not Found!</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FallbackDetails;
