import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePrimise = loadStripe('pk_test_51OECZ3CBbyKi0L0qft8ZA2KHVAAqFHpGHLbPLJT1zn0LErRbfmxFVlb3yFY7YuPQCkohXLS91A0mpJoCDFHN4vrv00fz8zvXSc')


const Payment = () => {
 
    
    return (
        <div>
            <SectionTitle heading="Payment" subHeading='Make your payments here'></SectionTitle>

            <div>
                <Elements stripe={stripePrimise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;