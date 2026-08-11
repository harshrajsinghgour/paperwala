import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Razorpay Checkout SDK */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </Head>
      <body className="bg-background text-textPrimary antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
