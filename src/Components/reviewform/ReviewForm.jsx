import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewForm.css";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, review });
    setRating(0);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Write a Review</h3>
      <div className="star-rating">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={ratingValue}
              className={ratingValue <= rating ? "star-filled" : "star-empty"}
              onClick={() => handleRating(ratingValue)}
            />
          );
        })}
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
        rows="4"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;