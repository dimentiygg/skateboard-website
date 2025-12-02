import { ButtonLink } from '@/components/ButtonLink';
import { Heading } from '@/components/Heading';

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-gray p-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <svg
              className="h-8 w-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <Heading as="h1" size="lg" className="mb-2">
            Payment Cancelled
          </Heading>
          <p className="text-zinc-600 ~text-base/lg">
            Your payment was cancelled. No charges were made.
          </p>
        </div>
        <ButtonLink href="/" color="orange" size="lg">
          Return to Shop
        </ButtonLink>
      </div>
    </div>
  );
}

