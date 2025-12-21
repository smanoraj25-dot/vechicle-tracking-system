import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useState } from "react";
import "../productsidebar/ProductSidebar.css";
import PriceRangeSlider from "../../Components/productsidebar/PriceRange.jsx";

const ProductSideBar = ({ filopt, title, handleChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="filter-section">
      <div className="sidebar-header" onClick={toggleExpansion}>
        <span>{title}</span>
        {isExpanded ? <SlArrowUp /> : <SlArrowDown />}
      </div>

      {isExpanded && (
        <div
          className={`category-list ${title === "color" ? "color-list" : ""}`}
        >
          {title !== "price" ? (
            <ul>
              {filopt.map((category) => (
                <li key={category} className="category-item">
                  <input
                    type="checkbox"
                    name={title}
                    value={category}
                    onChange={(e) => handleChange(e)}
                    className={title === "color" ? "color-checkbox" : ""}
                    style={
                      title === "color"
                        ? { backgroundColor: category }
                        : {}
                    }
                  />
                  {title !== "color" && <span>{category}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <PriceRangeSlider
              max={filopt[0]}
              min={filopt[1]}
              onChange={handleChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSideBar;
