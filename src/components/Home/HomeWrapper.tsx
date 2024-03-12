import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';
import constants from '@/utils/constants';
import Card from '../ui/Card/Card';
import Button from '../ui/Button/Button';

const HomeWrapper = () => {
  return (
    <section className=" flex max-w-[800px] flex-col  items-center justify-between self-center pb-0  text-xl font-semibold">
      <Card>
        <h1 className="mb-8 text-[33px]">
          <span className="mb-4 block">Hi!</span>
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--color-accent-blog)] bg-clip-text font-extrabold  leading-10 text-transparent">
            {constants.SITE_NAME}!
          </span>
        </h1>
        <ul className=" list-disc font-normal [&>li]:mb-4 [&>li]:marker:text-[color:var(--color-blogs-date)]">
          <li>
            <p>This is a place to find some interesting ideas to improve your life.</p>
          </li>
          <li>
            <p>
              We are sharing tips and tricks about how to be more productive, how to be more healthy, how to be more
              happy.
            </p>
          </li>
          <li>
            <p>
              We are sharing our experience and our knowledge collected from books and from different experts with you.
            </p>
          </li>
          <li>
            <p>
              The science is not settled, the science is evolving, so we are trying to keep up with the latest
              researches and share them with you.
            </p>
          </li>
          <li>
            <p>So, if you want to be more productive, more healthy and more happy, you are in the right place.</p>
          </li>
          <li>
            <p>
              But before you start, please read our disclaimer &gt;{' '}
              <Link
                href={'/disclaimer'}
                className="linkVisible font-semibold tracking-[1px] text-[var(--color-accent-blog)] underline hover:brightness-90"
              >
                Disclaimer
              </Link>
            </p>
          </li>
        </ul>
        <div className="flex justify-center">
          {/* <Button link="/articles" style="btn btn-ghost">
            Read Articles
          </Button> */}
          <Button style={`btn btn-ghost `} link={'/posts'}>
            <div className="flex items-center justify-center">
              <span className="mr-2"> Steal Ideas</span>
              <BsArrowRight />
            </div>
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default HomeWrapper;
