import React, { useEffect } from "react";

const Searchsite = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://cse.google.com/cse.js?cx=639c609f5035f4675`; // Replace with your CX ID
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="gcse-search"></div> // Google injects search UI here
  );
};

export default Searchsite;
