import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import ProductSideBar from "../../Components/productsidebar/ProductSidebar.jsx";
import Items from "../../Components/items/Items.jsx";
import { FaSearchMinus, FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const location = useLocation();
  const category = location.state?.category || "";
  const { products } = useSelector((state) => state.products);

  const [selectedFilters, setSelectedFilters] = useState({ category: [], material: [], color: [], size: [] });
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleFilterChange = useCallback((e) => {
    const { name, value, checked } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((v) => v !== value),
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        Number(product.price) >= priceRange[0] &&
        Number(product.price) <= priceRange[1]
    );

    if (category) {
      filtered = filtered.filter(
        (item) => category === item.category.toLowerCase()
      );
    }

    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length) {
        filtered = filtered.filter((product) =>
          Array.isArray(product[key])
            ? product[key].some((item) => values.includes(item.name))
            : values.includes(product[key])
        );
      }
    });

    return filtered;
  }, [products, category, selectedFilters, priceRange]);

  const getUniqueValues = useMemo(
    () => (key) =>
      key === "color" || key === "size"
        ? [
            ...new Set(
              products.flatMap((p) => p[key]?.map((c) => c.name) || [])
            ),
          ]
        : [...new Set(products.map((p) => p[key]))],
    [products]
  );

  const prices = useMemo(
    () =>
      products
        .map((prd) => Number(prd.price))
        .filter((price) => !isNaN(price) && price > 0),
    [products]
  );
  const maxPrice = Math.max(...prices, 0);
  const minPrice = Math.min(...prices, Infinity);

  return (
    <div className="product-pages container">
      <button
        className="mobile-filter-toggle"
        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
      >
        <FaFilter /> Filters
      </button>
      <div className="row">
        <div
          className={`col-lg-3 mobile-filter-menu ${
            isMobileFilterOpen ? "open" : ""
          }`}
        >
          <div
            className="container-sticky filterScroll"
            style={{ height: `${window.innerHeight - 50}px`, overflow: "scroll" }}
          >
            <h2 className="filter-heading">
              <span>🔍</span> Filter
              <MdClose onClick={() => setIsMobileFilterOpen(false)} />
            </h2>
            {["price", "category", "material"].map((title) => (
              <ProductSideBar
                key={title}
                filopt={
                  title === "price" ? [maxPrice, minPrice] : getUniqueValues(title)
                }
                title={title}
                handleChange={
                  title === "price" ? setPriceRange : handleFilterChange
                }
              />
            ))}
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row">
            {filteredProducts.length ? (
              filteredProducts.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-6 pb-3" key={index}>
                  <Items prdts={item} />
                </div>
              ))
            ) : (
              <div className="search-not-found-container">
                <FaSearchMinus className="not-found-icon" />
                <h2>Oops! No Sarees Found</h2>
                <p>
                  We couldn't find any sarees based on your search. Please try
                  again with different keywords or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;