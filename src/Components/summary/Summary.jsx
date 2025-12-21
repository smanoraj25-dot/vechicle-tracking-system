import { memo } from 'react';

const Summary = ({ cartItems, shippingCharge, finalTotal }) => {
    return (
        <div className="summary-content">
            <h3 className="chkout-head-summary text-center">Order Summary</h3>
            {cartItems.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center mb-3 des-details">
                    <div className="col-2">
                        <img src={item.image} alt={item.name} className="img-fluid" />
                    </div>
                    <div className="col-10 crt-details">
                        <h3>{item.name}</h3>
                        <p>Price: {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                </div>
            ))}
            <hr />
            <div className="col-12 text-center final-price">
                {shippingCharge > 0 && <p>International Shipping: ₹2000</p>}
                <p>Total Rs: ₹{finalTotal}</p>
            </div>
        </div>
    );
};

export default memo(Summary);
