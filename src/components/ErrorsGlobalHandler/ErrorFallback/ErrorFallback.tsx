/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import constants from '../../../utils/constants';
import BrokenHeartErrorImage from '../../common/SVGs/BrokenHeartErrorImage';
import SEO from '../../common/SEO';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';

const ErrorFallback = () => {
  const pageMeta = {
    title: 'Server Error',
    description: 'Oops! Even the things we love break sometimes! Server error!',
    url: `${constants.SITE_DOMAIN}/500`,
  };

  return (
    <section className={'container flex h-full w-full flex-col items-center justify-center'}>
      <SEO pageCustomSEO={pageMeta} />
      <div className={'errorFallbackContainer w-[90%]'}>
        <Card className={'errorFallbackCardContainer flex flex-row items-start justify-start'}>
          <div className={'errorFallbackTextContainer flex-[1.9]'}>
            <h1 className={'errorFallbackTitle mb-2 text-[25px] text-[var(--color-red-light-2)]'}>
              Even the things we love break sometimes...
            </h1>
            <h4 className={'errorFallbackSubtitle mb-2 text-[16px] font-semibold tracking-[1px]'}>
              Thanks for your patience while we put the pieces back together.
            </h4>
            <p className={'errorFallbackParagraph text-[16px]'}>In the meantime, you can...</p>
            <ul className={'errorFallbackList mt-4'}>
              {/* TODO: ! implement a feedback form here */}
              {/* <li>
                <Button style={`btn btn-ghost mb-4`} link="/feedback">
                  Help us by sending us a feedback
                </Button>
              </li> */}

              <li>
                <Button style={`btn btn-ghost`} link="/">
                  Go back to the homepage
                </Button>
              </li>
            </ul>
          </div>
          <div className={'errorFallbackImage'}>
            <BrokenHeartErrorImage />
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ErrorFallback;
