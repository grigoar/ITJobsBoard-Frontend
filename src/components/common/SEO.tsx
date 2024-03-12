import React from 'react';
import Head from 'next/head';
import constants from '@/utils/constants';
import { PageSEOModel } from '@/models/Utils/PageSEOModel';

interface Props {
  pageCustomSEO?: PageSEOModel;
  title?: string;
  description?: string;
  customTitle?: string;
}

const SEO = (props: Props) => {
  const { pageCustomSEO } = props;
  let title = `${pageCustomSEO?.title ? `${pageCustomSEO.title} | ` : ''}${constants.SITE_NAME}`;
  const description = pageCustomSEO?.description || 'Improve your touch typing skills and have fun in the meantime';
  const url = `${pageCustomSEO?.url ? pageCustomSEO.url : constants.SITE_DOMAIN}`;

  if (pageCustomSEO?.customTitle) {
    title = pageCustomSEO.customTitle;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="keywords" content={pageCustomSEO?.keywords || constants.WEBSITE_SEO_KEYWORDS_DEFAULT} />
      <meta name="og:url " content={url} />
    </Head>
  );
};

export default SEO;
