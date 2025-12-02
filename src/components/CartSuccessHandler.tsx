'use client';

import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

export function CartSuccessHandler() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return null;
}
