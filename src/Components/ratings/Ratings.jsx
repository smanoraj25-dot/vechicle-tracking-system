import { FaStar } from "react-icons/fa";
import "./Ratings.css";

const Ratings = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} className={index < rating ? "star-filled" : "star-empty"} />
  ));

  return <div className="star-rating">{stars}</div>;
};

export default Ratings;