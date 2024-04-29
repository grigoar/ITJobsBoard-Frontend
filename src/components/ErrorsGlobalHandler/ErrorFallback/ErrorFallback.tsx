/* eslint-disable @next/next/no-html-link-for-pages */
import constants from '../../../utils/constants';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import SEO from '../../common/SEO';
import BrokenHeartErrorImage from '../../common/SVGs/BrokenHeartErrorImage';

const ErrorFallback = () => {
  const pageMeta = {
    title: 'Server Error',
    description: 'Oops! Even the things we love break sometimes! Server error!',
    url: `${constants.SITE_DOMAIN}/500`,
  };
  const onRedirectHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <section className={'container flex h-[100vh] w-full flex-col items-center justify-center'}>
      <SEO pageCustomSEO={pageMeta} />
      <div className={'errorFallbackContainer w-[90%]'}>
        <Card className={'errorFallbackCardContainer flex flex-row items-start justify-start'}>
          <div className={'errorFallbackTextContainer flex-[1.9]'}>
            <h1 className={'errorFallbackTitle mb-2 text-[25px] text-[var(--color-red-light)]'}>
              Even the things we love break sometimes...
            </h1>
            <h4 className={'errorFallbackSubtitle mb-2 text-[16px] font-semibold tracking-[1px]'}>
              Thanks for your patience while we put the pieces back together.
            </h4>
            <p className={'errorFallbackParagraph text-[16px]'}>In the meantime, you can...</p>
            <ul className={'errorFallbackList mt-4'}>
              <li>
                <Button style={`btn btn-ghost`} action={onRedirectHomeClick} link="/">
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
