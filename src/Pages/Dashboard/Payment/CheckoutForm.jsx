import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import useCart from "../../../Hooks/useCart";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [err, setErr] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxios()
    const { cart, refetch } = useCart()
    const { user } = useContext(AuthContext)
    const [transactionID, setTransactionID] = useState('')
    const nav = useNavigate()


    const totalPrice = cart?.reduce((acc, curr) => { return acc + curr.price }, 0)


    useEffect(() => {
        if (totalPrice === 0) { return }
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
            .catch(err => console.log(err))
    }, [axiosSecure, totalPrice])

    console.log(clientSecret)

    async function handleSubmit(e) {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) { return }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log(error)
            setErr(error.message)
        }
        if (paymentMethod) {
            console.log('Payment method is:', paymentMethod)
            setErr('')
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if (confirmError) {
            console.log(confirmError)

        }
        else {
            console.log('payment Intent : ', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log("here is your Transaction id:", paymentIntent.id)
                setTransactionID(paymentIntent.id)

                // Now save the payment in the database
                const payment = {
                    email: user?.email,
                    name: user.displayName,
                    transactionID: paymentIntent.id,
                    price: totalPrice,
                    date: new Date(), // utc date convert. luxon or moment..
                    cartIDs: cart.map(item => item._id),
                    menuIDs: cart.map(item => item.food_id),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log(res.data)
                refetch()
                if (res?.data?.paymentResult?.insertedId) {
                    alert("Payment successful")
                    nav('/dashboard/paymentHistory')
                }
            }
        }


    }

    return (
        <div className="border p-4 w-1/2  mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                iconColor: '#c4f0ff',
                                color: '#fff',
                                fontWeight: '500',
                                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                fontSize: '16px',
                                fontSmoothing: 'antialiased',
                                ':-webkit-autofill': {
                                    color: '#fce883',
                                },
                                '::placeholder': {
                                    color: '#87BBFD',
                                },
                            },
                            invalid: {
                                iconColor: '#FFC7EE',
                                color: '#FFC7EE',
                            },
                        },
                    }}
                ></CardElement>
                <button className="btn bg-red-500 my-8" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">! {err}</p>
                {
                    transactionID && <p className="text-lime-400">Transaction ID : {transactionID}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;