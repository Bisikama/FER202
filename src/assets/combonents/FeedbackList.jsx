import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { FaStar, FaRegStar, FaStarHalfAlt, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Helper function to render star rating
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" />);
  }

  return stars;
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
};

const FeedbackList = ({ feedback = [] }) => {
  // Calculate average rating
  const averageRating = feedback.length > 0
    ? (feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length).toFixed(1)
    : 0;

  // Sort feedback by date (newest first)
  const sortedFeedback = [...feedback].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="feedback-list">
      {/* Average Rating Summary */}
      {feedback.length > 0 && (
        <div className="text-center mb-4 p-4" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          color: 'white'
        }}>
          <h3 className="mb-2">Average Rating</h3>
          <div className="display-4 fw-bold mb-2">{averageRating}</div>
          <div className="fs-4 mb-2">
            {renderStars(parseFloat(averageRating))}
          </div>
          <p className="mb-0">Based on {feedback.length} {feedback.length === 1 ? 'review' : 'reviews'}</p>
        </div>
      )}

      {/* Feedback List */}
      <div className="mt-4">
        <h4 className="mb-3">
          <FaUser className="me-2" />
          Customer Reviews ({feedback.length})
        </h4>

        {feedback.length === 0 ? (
          <div className="text-center py-5">
            <div className="fs-1 mb-3">💬</div>
            <p className="text-muted">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="row g-3">
            {sortedFeedback.map((fb, index) => (
              <div key={index} className="col-12">
                <Card className="shadow-sm hover-shadow transition-all" style={{
                  borderLeft: '4px solid #667eea',
                  transition: 'all 0.3s ease'
                }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="d-flex align-items-center mb-1">
                          <FaUser className="text-primary me-2" />
                          <strong>{fb.author}</strong>
                        </div>
                        <div className="mb-2">
                          {renderStars(fb.rating)}
                          <Badge bg="primary" className="ms-2">{fb.rating}/5</Badge>
                        </div>
                      </div>
                      <small className="text-muted">{formatDate(fb.date)}</small>
                    </div>
                    <Card.Text className="mb-0" style={{ fontSize: '1rem' }}>
                      {fb.comment}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
};

export default FeedbackList;
