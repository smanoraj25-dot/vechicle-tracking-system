import React, { memo } from 'react';
import '../NavBar/Navbar.css';

const Marquee = () => {
  return (
    <div className="marquee">
      <span>
        seelaikaari.com&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Silk Sarees&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Kanchivaram&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Handloom Cotton&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Bridal Collection&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Free Shipping (Domestic Orders)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;International Shipping ₹2000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Limited Offer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Trusted by 10,000+ Customers&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Festive Collection&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;seelaikaari.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;Silk Sarees
    </span>
    </div>
  );
};

export default memo(Marquee);
