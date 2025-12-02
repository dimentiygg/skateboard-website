import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/prismicio';
import { asImageSrc, isFilled, ImageField } from '@prismicio/client';

const normalize = (str: string) => str.toLowerCase().replace(/[-_\s]/g, '');

const matchesDeckUid = (url: string, uid: string | null) => {
  if (!uid) return true;
  return normalize(url).includes(normalize(uid));
};

const findCompleteImage = (
  imageField: ImageField | null | undefined,
  deckUid: string | null
) => {
  if (!isFilled.image(imageField)) return null;

  const url = asImageSrc(imageField);
  if (!url || !url.includes('-complete')) return null;

  return matchesDeckUid(url, deckUid) ? url : null;
};

export async function GET(request: NextRequest) {
  try {
    const deckUid = new URL(request.url).searchParams.get('deckUid');
    const client = createClient();
    let fallback: string | null = null;

    const settings = await client.getSingle('settings').catch(() => null);
    if (settings?.data.footer_skateboards) {
      for (const item of settings.data.footer_skateboards) {
        if (!item) continue;
        const url = findCompleteImage(item.skateboard, deckUid);
        if (url) return NextResponse.json({ imageUrl: url });
        if (!fallback && isFilled.image(item.skateboard)) {
          const fallbackUrl = asImageSrc(item.skateboard);
          if (fallbackUrl?.includes('-complete')) fallback = fallbackUrl;
        }
      }
    }

    const skateboards = await client.getAllByType('skateboard', { limit: 20 });
    for (const skateboard of skateboards) {
      const url = findCompleteImage(skateboard.data.image, deckUid);
      if (url) return NextResponse.json({ imageUrl: url });
      if (!fallback && isFilled.image(skateboard.data.image)) {
        const fallbackUrl = asImageSrc(skateboard.data.image);
        if (fallbackUrl?.includes('-complete')) fallback = fallbackUrl;
      }
    }

    return NextResponse.json({ imageUrl: fallback });
  } catch {
    return NextResponse.json({ imageUrl: null }, { status: 500 });
  }
}
