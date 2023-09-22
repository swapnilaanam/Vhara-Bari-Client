import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './CheckOutForm.css';
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = ({ rentedHouseInfo, price, selectedHouseId }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        if (price && price > 0) {
            axiosSecure.post('/create-payment-intent', {
                price
            })
                .then(res => {
                    setClientSecret(res.data?.clientSecret);
                })
                .catch(error => console.log(error));
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }

        console.log('paymentIntent', paymentIntent);
        setProcessing(false);

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: price,
                data: new Date(),
                houseId: rentedHouseInfo.houseId,
                houseName: rentedHouseInfo.houseName,
                ownerEmail: rentedHouseInfo.ownerEmail
            };

            axiosSecure.post('/payments', payment)
                .then(res => {
                    if (res.data.insertedId) {
                        axiosSecure.post('/rentedhouses', rentedHouseInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    axiosSecure.patch(`/houses/status/${selectedHouseId}`, {
                                        status: 'Rented'
                                    })
                                        .then(res => {
                                            if (res.data.modifiedCount > 0) {
                                                Swal.fire({
                                                    position: 'top-end',
                                                    icon: 'success',
                                                    title: `Payment Successful! You successfully rented the house!`,
                                                    showConfirmButton: false,
                                                    timer: 2500
                                                });
                                            }
                                        })
                                        .catch(error => console.log(error));
                                }
                            })
                            .catch(error => console.log(error));
                    }
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <div className="px-4 lg:px-0">
            <form onSubmit={handleSubmit} id="checkoutform">
                <CardElement
                    className="shadow-xl border-2 rounded-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className="text-center">
                    <button type="submit" className="btn btn-warning w-3/4 h-8 mt-8 text-lg font-semibold" disabled={!stripe || !clientSecret || processing}>
                        Pay Now
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-600 mt-4 ">{cardError}</p>}
            {transactionId && <p className="text-green-700 mt-4">
                Transaction complete with transactionId: {transactionId} (Wait few seconds for confirmation sweet alert)
            </p>}
        </div>
    );
};

export default CheckOutForm;