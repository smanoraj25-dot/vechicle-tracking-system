import { memo, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import PriceRangeSlider from "../../Components/productsidebar/PriceRange.jsx";
import "./ProductSidebar.css"
const ProductSideBar = ({ filopt, title, handleChange, handleSearch }) => {
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
          className={`category-list ${title === "color" ? "color-list" : ""}`}>
          {title === "price" ? (
            <PriceRangeSlider
              max={filopt[0]}
              min={filopt[1]}
              onChange={handleChange}
            />
          ) : title === "search" ? (
            <input type="text" placeholder="Search by name..." onChange={handleSearch} style={{width: "100%", border: "1px solid #ccc", padding: "5px"}}/>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
};

export default memo(ProductSideBar);
