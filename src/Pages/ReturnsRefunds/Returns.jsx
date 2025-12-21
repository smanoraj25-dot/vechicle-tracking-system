import React from "react";
import "./Returns.css";

function Returns() {
  return (
    <>
      <section className="container-fluid return-policy">
        <h1>Returns, Refund And Exchange</h1>
      </section>

      <section className="container return-details">
        <p>
          Before you make a decision to return our saree, please note the time
          and effort that goes into making each of our handcrafted kanjivaram
          sarees. Our artisans work efficiently, and pay individual attention to
          all the details in the making of each saree.
        </p>

        <ul>
          <li>
            We Have <b> A NO RETURN NO EXCHANGE </b> Policy on All Our Products
            as each of our products are bespoke from the other.
          </li>
          <li>
            Our product goes through two levels of quality check to ensure zero
            defect or damage before the shipments dispatched from our facility.
          </li>
          <li>
            In a case of rarity, a manufacturing defect is found upon delivery
            you can raise a complaint with our customer support team to reach an
            amicable resolution.
          </li>
          <li>
            Please note Colour rendition of the sarees might slightly vary from
            the image on the screen, due to lighting and LED screen brightness
            of individual screens and returns will not be accepted for the above
            stated reason however, you can contact our customer support team for
            any clarification on the colour of the product before you place your
            order.{" "}
          </li>
          <li>
            Once the order is confirmed, refund or cancellation of the order is
            not possible.
          </li>
          <li>
            In a case of rarity an order is double booked the amount charged
            will be credited back to the customers source account.
          </li>
        </ul>

      </section>
    </>
  );
}

export default Returns;
