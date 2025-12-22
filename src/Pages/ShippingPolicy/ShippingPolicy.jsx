import "./ShippingPolicy.css"

function ShippingPolicy() {
  return (
    <>
      <section className="container-fluid shipping-policy">
        <h1>Shipping Policy</h1>
      </section>

      <section className="container shipping-details">
        <h3>Domestic Shipping –</h3>
        <ul>
          <li>FREE domestic shipping throughout INDIA.</li>
          <li>All domestic orders will be shipped through reputed carrier service providers depending on the delivery location.</li>
          <li>Tracking details of your shipment will be shared via <b>e-mail</b> or <b>SMS </b>and can be tracked using the details provided, once the product has been dispatched from our facility.</li>
          <li>Domestic Orders will be delivered within 2- 7 working days.</li>
          <li>For special requests such as change in contact number, rectification of an incorrect address or pincode, please contact our customer support team with your oder no for further assistance.</li>
        </ul>

        <h3>International Shipping-</h3>
       
        <ul>
          <li>For international orders a flat fee of INR 2000 will be charged per product.  </li>
          <li>International orders will be shipped through our reputed logistic partner(DHL,FedEX,UPS).</li>
          <li>For international shipment based on the country of import our carrier may need to get customs clearance for your shipment in such case any additional import tax or customs charges levied by the country of import will be borne by the customer. For any further assistance regarding this feel free to contact our customer support team.</li>
          <li>Once the international order is placed, it takes 3 to 5 business days to process and dispatch after placing the order.</li>
          <li>For international shipment delivery time, you can contact our customer support team for any assistance before placing the order.
          </li>
          <li>Tracking details of your shipment will be shared via e-mail or phone and can be tracked on the link shared via e-mail once the product has been dispatched</li>
        </ul>
        

        <p className="support-text">
     <b>   Customers Are Requested To Provide An Accurate and Complete Address with Valid Contact Information to Avoid Delays In Shipping.</b>


        </p>

       
      </section>
    </>
  );
}

export default ShippingPolicy;
