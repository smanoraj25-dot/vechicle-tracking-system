import React, { useState, useEffect } from "react";
import "./PriceRange.css";

const PriceRangeSlider = ({ min = 0, max = 10000, onChange }) => {
  const [range, setRange] = useState([min, max]);

  // Only call `onChange` when the range is updated
  const handleMinChange = (e) => {
    const newValue = parseInt(e.target.value);
    // Ensure that min value is not greater than max value
    if (newValue <= range[1]) {
      setRange([newValue, range[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const newValue = parseInt(e.target.value);
    // Ensure that max value is not less than min value
    if (newValue >= range[0]) {
      setRange([range[0], newValue]);
    }
  };

  useEffect(() => {
    // Avoid infinite loop by checking if the range is different before calling onChange
    if (onChange) {
      onChange(range);
    }
  }, [range, onChange]); // Dependency array ensures that `onChange` is called only when `range` changes

  useEffect(() => {
    setRange([min, max]); // Initialize the range when min or max props change
  }, [min, max]);

  return (
    <div className="price-range-slider">
      <div className="range-labels">
        <span>₹{range[0]}</span>
        <span>₹{range[1]}</span>
      </div>
      <div className="range-sliders">
        {/* Min slider */}
        <input
          type="range"
          name="min"
          min={min}
          max={max}
          value={range[0]}
          onChange={handleMinChange}
          className="slider"
        />
        {/* Max slider */}
        <input
          type="range"
          name="max"
          min={min}
          max={max}
          value={range[1]}
          onChange={handleMaxChange}
          className="slider"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
