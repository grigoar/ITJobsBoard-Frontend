import React from 'react';
import Button from '../../ui/Button/Button';

const Header = () => {
  return (
    <footer className="bg-secondary">
      <div className="flex justify-center gap-6  p-4">
        <div className="flex flex-grow justify-center gap-10 tracking-widest text-[var(--text-color-calm-strong)]">
          <Button link="/">Home</Button>
          <Button link="/posts">Blog</Button>
          <Button link="/contact">Contact</Button>
          <Button link="/disclaimer">Disclaimer</Button>
        </div>
      </div>
    </footer>
  );
};

export default Header;
