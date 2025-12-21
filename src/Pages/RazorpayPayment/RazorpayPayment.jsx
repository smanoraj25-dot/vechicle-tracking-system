import { useState } from "react";
import "../RazorpayPayment/RazorpayPayment.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
const API_URL = import.meta.env.VITE_BACKENDURL;


const RazorpayPayment = ({ totalAmount, userDetails, cartItems, setShowPayment }) => {

  const navigate = useNavigate();
  const { user} = useSelector((state) => state.auth);
  const [setLoading] = useState(false);

 
  const handlePayment = async () => {
 
    try {

      // Create Razorpay Order
      const orderResponse = await fetch(`${API_URL}/api/order/create-razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount,userDetails,cartItems,user:user?.id}),
      });

      const orderData = await orderResponse.json();
    
      if (!orderData.success) {
        alert("Failed to create Razorpay order");
        return;
      }

      if (!window.Razorpay) {
        alert("Payment gateway not loaded. Try again.");
        setLoading(false);
        return;
      }
      // Open Razorpay Payment Window
      const options = {
        key: razorpayKey,
        order_id: orderData.order.id,
        amount: orderData.order.amount,
        currency: "INR",
        name: "Seelaikaari Store",
        description: "Secure Saree Purchase",
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone || "",
        },
        handler: async function (response) {
          console.log("✅ Payment Success:", response);

          if (!response.razorpay_payment_id || !response.razorpay_signature) {
            console.error("Missing payment_id or signature from Razorpay!");
            alert("Payment verification failed! Try again.");
            return;
          }
         
        },
      
         modal: {
          ondismiss: function () {
            alert("Payment was cancelled. Please try again.");
          }
        }
        // theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      setTimeout(() => rzp.open(), 1000); 
      rzp.on('payment.failed', function (response) {
        console.error("❌ Payment Failed:", response.error);
        alert("Payment Failed: " + response.error.description);
      });
      
      // Try logging the payment success event
      rzp.on('payment.success', function (response) {
        // console.log("✅ Payment Success:", response);
        if(user){
          navigate(`/Account`);
        }else{
          navigate(`/`);
        }
        toast.success("Order placed successfully! Please check your email for details.");
      });
      
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Try again!");
    }
  };

  return (
    <div className="payment-container text-center">
      <h2>Review & Pay</h2>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Mobile:</strong> {userDetails.phone}</p>
      <p><strong>Total Amount:</strong> <b>Rs. {totalAmount}</b></p>

      <button onClick={handlePayment} className="btn btn-success checkoutButton">
        Pay Now
      </button>
      <button className="btn btn-warning mt-3 mx-2" onClick={() => setShowPayment(false)}>
        Edit Details
      </button>
      <p className="help-text mt-2">
        Need help? <a href="mailto:seelaikaari588@gmail.com">Contact us</a>
      </p>
    </div>
  );
};

export default RazorpayPayment;
