'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export function CheckoutButton() {
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to create checkout session');
        setIsLoading(false);
      }
    } catch {
      alert('An error occurred during checkout');
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className="button-cutout group mx-0 w-full inline-flex items-center justify-center gap-3 bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] px-1 font-bold transition-[filter,background-position] duration-300 hover:bg-bottom from-brand-orange to-brand-lime text-black hover:text-black ~py-3/4 ~text-lg/2xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>
  );
}

