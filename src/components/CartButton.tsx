'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { FaCartShopping } from 'react-icons/fa6';

export function CartButton() {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="button-cutout group mx-4 inline-flex items-center gap-3 bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] px-1 font-bold transition-[filter,background-position] duration-300 hover:bg-bottom from-brand-purple to-brand-lime text-white hover:text-black ~py-2.5/3 ~text-lg/xl"
      aria-label={`Cart (${totalItems})`}
    >
      <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
        <FaCartShopping />
      </div>
      <div className="w-px self-stretch bg-black/25" />
      <span className="md:hidden">{totalItems}</span>
      <span className="hidden md:inline">Cart ({totalItems})</span>
    </button>
  );
}

