import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';

const stripePromise = loadStripe('pk_test_51RaLeg07OIDqXXBcS4xXryHR5mXrtpVZFmTBR0MpGwJJuCpgsZ4DWRfbMQCCrTtGZSE61ukK5b2rF7znCje4RsP400b7jM3bLQ');

const StripeWrapper = ({ onBack, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <Payment onBack={onBack} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripeWrapper;
