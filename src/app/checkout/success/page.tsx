import { ButtonLink } from '@/components/ButtonLink';
import { Heading } from '@/components/Heading';
import { CartSuccessHandler } from '@/components/CartSuccessHandler';

export default async function SuccessPage() {
  return (
    <>
      <CartSuccessHandler />
      <div className="flex min-h-screen flex-col items-center justify-center bg-brand-gray p-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <Heading as="h1" size="lg" className="mb-2">
              Payment Successful!
            </Heading>
            <p className="text-zinc-600 ~text-base/lg">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>
          <ButtonLink href="/" color="orange" size="lg">
            Continue Shopping
          </ButtonLink>
        </div>
      </div>
    </>
  );
}

