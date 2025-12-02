import Link from 'next/link';
import React from 'react';
import { Logo } from './Logo';
import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import { ScrollLink } from './ScrollLink';
import { CartButton } from './CartButton';
export async function Header() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return (
    <header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
        <Link href="/" className="justify-self-start">
          <Logo className=" text-brand-purple ~h-12/20" />
        </Link>
        <nav
          aria-label="Main"
          className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1"
        >
          <ul className="flex flex-wrap items-center justify-center gap-8">
            {settings.data.navigation.map(item => (
              <li key={item.link.text}>
                {item.link.text === 'Team' ? (
                  <ScrollLink to="team" className="~text-lg/xl">
                    {item.link.text}
                  </ScrollLink>
                ) : item.link.text === 'About' ? (
                  <ScrollLink to="about" className="~text-lg/xl">
                    {item.link.text}
                  </ScrollLink>
                ) : (
                  <PrismicNextLink field={item.link} className="~text-lg/xl" />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="justify-self-end">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
