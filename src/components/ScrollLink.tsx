'use client';

import React from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export const ScrollLink = ({ to, children, className }: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const target = document.getElementById(to);
    if (!target) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: target,
      ease: 'power2.inOut',
    });

    history.replaceState(null, '', ' ');
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
