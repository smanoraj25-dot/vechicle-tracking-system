import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useShippingHandling from "../../hooks/useShippingHandling";
import ShippingForm from "../../Components/shippingform/ShippingForm";
import Summary from "../../Components/summary/Summary";
import RazorpayPayment from "../RazorpayPayment/RazorpayPayment";
import "../Checkout/Checkout.css";

function Checkout() {
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];
    const baseTotal = Number(location.state?.totalAmount || 0);

    const {
        userDetails,
        formErrors,
        countries,
        states,
        cities,
        shippingCharge,
        finalTotal,
        handleInputChange,
        validateForm,
    } = useShippingHandling(baseTotal);

    const [showPayment, setShowPayment] = useState(false);

    if (!cartItems.length) {
        return <Navigate to="/cart" replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowPayment(true);
        }
    };

    return (
        <div className="chkout-outer">
            <div className="container chk-out">
                <h2>Enter Shipping Details</h2>
                {!showPayment ? (
                    <div className="row caart-holder">
                        <div className="col-md-8 form-contains">
                            <ShippingForm
                                userDetails={userDetails}
                                formErrors={formErrors}
                                countries={countries}
                                states={states}
                                cities={cities}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                        <div className="col-md-4 chkout-summary">
                            <Summary
                                cartItems={cartItems}
                                shippingCharge={shippingCharge}
                                finalTotal={finalTotal}
                            />
                        </div>
                    </div>
                ) : (
                    <RazorpayPayment
                        totalAmount={finalTotal}
                        userDetails={userDetails}
                        cartItems={cartItems}
                        setShowPayment={setShowPayment}
                    />
                )}
            </div>
        </div>
    );
}

export default Checkout;
