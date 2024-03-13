/* eslint-disable react/no-children-prop */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import { BsArrowLeft } from 'react-icons/bs';

import Card from '../../ui/Card/Card';
import { BlogPostModel } from '../../../models/BlogPosts/BlogPostModel';
import PostHeader from './PostHeader';
import FeaturedPosts from '../HomePosts/FeaturedPostsGrid';
import Button from '../../ui/Button/Button';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

interface Props {
  post: BlogPostModel;
  relatedPosts: BlogPostModel[];
}
const PostContent = ({ post, relatedPosts }: Props) => {
  const imagePath = `/images/posts/${post.slug}/${post.imageDetails ? post.imageDetails : post.image}`;

  const customRenderers = {
    // Parsing each paragraph from the md file
    // @ts-ignore
    p(paragraph) {
      const { node } = paragraph;
      // console.log(node);

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={'imageContainer relative flex items-center justify-center'}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={500}
              height={200}
              unoptimized={true}
              className="my-2  h-auto max-h-[300px] max-w-full object-contain "
            />
          </div>
        );
      }
      return <p className="my-4">{paragraph.children}</p>;
    },

    // paring code syntax
    // @ts-ignore
    code(code) {
      const { className, children } = code;
      const language = className.split('-')[1];

      return (
        <div className={'codeWrapper'}>
          <SyntaxHighlighter
            style={atomDark}
            // customStyle={{ width: '275px' } as React.CSSProperties}
            language={language}
            children={children}
          />
        </div>
      );
    },
    a(props: any) {
      // eslint-disable-next-line no-unused-vars
      const { node, ...rest } = props;
      return (
        <Link
          href={rest.href}
          className={
            'linkVisible font-semibold tracking-[1px] text-[var(--color-accent-blog)] underline hover:brightness-90'
          }
          {...rest}
        />
      );
    },

    strong(props: any) {
      // eslint-disable-next-line no-unused-vars
      const { node, ...rest } = props;
      return <strong className={'text-[var(--text-color-calm-strong)]'} {...rest} />;
    },

    h2(props: any) {
      // eslint-disable-next-line no-unused-vars
      const { node, ...rest } = props;
      return <h2 className={'mt-5 text-2xl font-semibold text-[hsl(163,37%,49%)] '} {...rest} />;
    },

    ul(props: any) {
      // eslint-disable-next-line no-unused-vars
      const { node, ...rest } = props;
      return (
        <ul
          className={
            ' ml-10 list-outside list-disc  [&>li]:marker:font-bold [&>li]:marker:text-[color:var(--color-blogs-date)] '
          }
          {...rest}
        />
      );
    },

    ol(props: any) {
      // eslint-disable-next-line no-unused-vars
      const { node, ...rest } = props;
      return (
        <ol
          className={
            'ml-10 list-outside list-decimal  [&>li]:marker:font-bold [&>li]:marker:text-[color:var(--color-blogs-date)]'
          }
          {...rest}
        />
      );
    },
  };

  return (
    <div className="flex flex-col">
      <article
        className={`${'content  mx-auto mb-16 mt-0 w-[95%] max-w-[1100px] rounded-lg leading-[28px] lg:mb-0'} pageLayoutOnlyOneCard`}
      >
        <Card
          className={`${'articleContainer relative mx-auto mb-8 max-w-[800px] cursor-default tracking-[0.8px] text-[var(--text-color-calm)]'}`}
        >
          <div className={'articleText'}>
            <PostHeader title={post.title} image={imagePath} date={post.date} postReadTime={post.readTime} />

            <ReactMarkdown children={post.content} components={customRenderers} />
          </div>

          <div className="flex justify-center">
            <Button style={`btn btn-ghost `} link={'/posts'}>
              <div className="flex items-center justify-center">
                <BsArrowLeft />
                <span className="ml-2">All Posts</span>
              </div>
            </Button>
          </div>
        </Card>
      </article>
      <section className={'relatedPosts'}>
        <FeaturedPosts featuredPosts={relatedPosts} title="Featured Posts" titleStyling="min-w-[210px]" />
      </section>
    </div>
  );
};

export default PostContent;
