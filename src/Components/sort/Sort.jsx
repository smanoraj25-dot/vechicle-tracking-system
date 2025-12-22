import { Form } from "react-bootstrap";
import "./Sort.css";

const Sort = ({ onSortChange }) => {
  return (
    <div className="sort-container">
      <Form.Select onChange={(e) => onSortChange(e.target.value)} aria-label="Sort by">
        <option value="default">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A to Z</option>
        <option value="name_desc">Name: Z to A</option>
      </Form.Select>
    </div>
  );
};

export default Sort;