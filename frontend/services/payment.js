export const initializeRazorpayPayment = ({ amount, user, onSuccess, onFailure }) => {
  if (typeof window === 'undefined') return;

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_paperwala',
    amount: amount * 100, // Amount in paise
    currency: 'INR',
    name: 'PaperWala Exam Prep',
    description: 'PRO Subscription Pass (1 Year)',
    image: '/logo.png',
    handler: function (response) {
      if (response.razorpay_payment_id) {
        onSuccess(response.razorpay_payment_id);
      }
    },
    prefill: {
      name: user?.name || 'Aspirant',
      email: user?.email || 'student@paperwala.in',
      contact: user?.phone || '9999999999',
    },
    theme: {
      color: '#F59E0B',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
