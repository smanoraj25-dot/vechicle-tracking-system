import React from 'react';
import "./PayementPolicy.css"

function PaymentPolicy() {
  return (
    <>
      <section className="container-fluid payment-policy">
        <h1>PAYMENT POLICY</h1>
      </section>

      <section className="container payment-details">
        <h3>INTERNATIONAL PAYMENT –</h3>
        <ul>
          <li>All major International CREDIT & DEBIT cards are accepted.</li>
          <li>We Can also Accept a Bank Transfer for Your Product and Ship it to Your Desired Destination</li>
          <li>PayPal can be accepted for your order.</li>
        </ul>

        <h3>DOMESTIC PAYMENT-</h3>
        <p>We Accept-</p>
        <ul>
          <li>Credit Card</li>
          <li>Debit Card</li>
          <li>Bank transfer and other mode of UPI payment available too, please contact our customer support team for further queries.</li>
        </ul>

        <p className="support-text">
          Any Payment Related Queries Contact Our Customer Support Team On The Number Provided Below OR Contact Us On <a className='ft-contact-link' href="https://www.instagram.com/seelaikaari/"><strong >Instagram</strong></a>
        </p>

        <p className="customer-support">
          SEELAIKAARI CUSTOMER SUPPORT TEAM- <a className='ft-contact-link' href="tel:9159312346"><strong>+91-9159312346</strong></a>
        </p>
      </section>
    </>
  );
}

export default PaymentPolicy;
