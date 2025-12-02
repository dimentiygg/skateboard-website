'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useCustomizerControls } from '@/app/build/context';
import { isFilled, Content } from '@prismicio/client';
import { FaPlus } from 'react-icons/fa6';

type CustomizerField =
  | Content.BoardCustomizerDocumentDataWheelsItem
  | Content.BoardCustomizerDocumentDataDecksItem
  | Content.BoardCustomizerDocumentDataMetalsItem
  | undefined;

export function AddToCartButtonWrapper() {
  const router = useRouter();
  const { addItem } = useCart();
  const { selectedWheel, selectedDeck, selectedTruck, selectedBolt } =
    useCustomizerControls();
  const [completeImage, setCompleteImage] = useState<string>('');

  const getUid = (field: CustomizerField) =>
    isFilled.keyText(field?.uid) ? field.uid : null;

  const formatUid = (uid: string | null, fallback: string) => {
    if (!uid) return fallback;
    return uid
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const deckUid = getUid(selectedDeck);
    if (!deckUid) return;

    fetch(`/api/skateboard-complete-image?deckUid=${deckUid}`)
      .then(res => res.json())
      .then(data => data.imageUrl && setCompleteImage(data.imageUrl))
      .catch(() => {});
  }, [selectedDeck?.uid]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    const wheelUid = getUid(selectedWheel);
    const deckUid = getUid(selectedDeck);
    const truckUid = getUid(selectedTruck);
    const boltUid = getUid(selectedBolt);

    addItem({
      id: `custom-${wheelUid || 'wheel'}-${deckUid || 'deck'}-${truckUid || 'truck'}-${boltUid || 'bolt'}`,
      name: `Custom Board: ${formatUid(deckUid, 'Default Deck')}`,
      price: 19900,
      image: completeImage || '',
      customization: {
        wheel: wheelUid || undefined,
        deck: deckUid || undefined,
        truck: truckUid || undefined,
        bolt: boltUid || undefined,
      },
    });

    router.push('/');
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="button-cutout group mx-4 inline-flex items-center gap-3 bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] px-1 font-bold transition-[filter,background-position] duration-300 hover:bg-bottom from-brand-lime to-brand-orange text-black hover:text-black ~py-2.5/3 ~text-lg/xl"
    >
      <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
        <FaPlus />
      </div>
      <div className="w-px self-stretch bg-black/25" />
      Add to cart
    </button>
  );
}
