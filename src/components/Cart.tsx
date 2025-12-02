'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { CheckoutButton } from './CheckoutButton';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa6';

export function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, closeCart } =
    useCart();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
      />

      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="~text-xl/2xl font-bold">Cart</h2>
            <button
              onClick={closeCart}
              className="text-zinc-600 hover:text-zinc-900 ~text-lg/xl"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-center text-zinc-600 ~text-lg/xl">
                  Cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4 last:border-b-0"
                  >
                    {item.image && (
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded bg-zinc-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-bold ~text-base/lg">{item.name}</h3>
                        {item.customization && (
                          <div className="mt-1 text-xs text-zinc-500">
                            Custom configuration
                          </div>
                        )}
                        <p className="text-zinc-600 ~text-sm/base">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 hover:bg-zinc-100"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="h-3 w-3" />
                        </button>
                        <span className="min-w-[2rem] text-center ~text-base/lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded border border-zinc-300 hover:bg-zinc-100"
                          aria-label="Increase quantity"
                        >
                          <FaPlus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto flex h-8 w-8 items-center justify-center rounded border border-red-300 text-red-600 hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="~text-lg/xl font-bold">Total:</span>
                <span className="~text-xl/2xl font-bold">
                  ${(totalPrice / 100).toFixed(2)}
                </span>
              </div>
              <CheckoutButton />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
