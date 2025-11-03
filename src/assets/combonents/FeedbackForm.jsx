import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Card, Button, Alert } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Validation schema
const feedbackSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Please select a rating')
    .max(5, 'Rating must be between 1 and 5')
    .required('Rating is required'),
  comment: Yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must not exceed 500 characters')
    .required('Comment is required'),
});

const FeedbackForm = ({ orchidId, existingFeedback = [], onSubmitFeedback }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Check if user already commented
  const userEmail = user?.email || '';
  const hasUserCommented = existingFeedback.some(fb => fb.author === userEmail);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newFeedback = {
        rating: values.rating,
        comment: values.comment,
        author: userEmail,
        date: new Date().toISOString(),
      };

      await onSubmitFeedback(orchidId, newFeedback);
      setSubmitStatus({ type: 'success', message: '✅ Thank you for your feedback!' });
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: `❌ Failed to submit feedback: ${error.message}` });
    } finally {
      setSubmitting(false);
    }
  };

  // If user not logged in
  if (!isAuthenticated) {
    return (
      <Alert variant="warning" className="text-center">
        <strong>⚠️ Please login to leave feedback!</strong>
      </Alert>
    );
  }

  // If user already commented
  if (hasUserCommented) {
    return (
      <Alert variant="info" className="text-center">
        <strong>ℹ️ You have already submitted feedback for this orchid.</strong>
        <br />
        <small>Each user can only submit one review per orchid.</small>
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm" style={{ borderTop: '4px solid #667eea' }}>
      <Card.Body>
        <h4 className="mb-4">
          ✍️ Share Your Experience
        </h4>

        {submitStatus && (
          <Alert 
            variant={submitStatus.type === 'success' ? 'success' : 'danger'} 
            dismissible
            onClose={() => setSubmitStatus(null)}
          >
            {submitStatus.message}
          </Alert>
        )}

        <Formik
          initialValues={{ rating: 0, comment: '' }}
          validationSchema={feedbackSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form>
              {/* Star Rating */}
              <div className="mb-4">
                <label className="form-label fw-bold">Your Rating *</label>
                <div className="d-flex align-items-center gap-2">
                  <div className="star-rating" style={{ fontSize: '2rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="star-icon"
                        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setFieldValue('rating', star)}
                      >
                        {(hoverRating >= star || values.rating >= star) ? (
                          <FaStar className="text-warning" />
                        ) : (
                          <FaRegStar className="text-warning" />
                        )}
                      </span>
                    ))}
                  </div>
                  {values.rating > 0 && (
                    <span className="text-muted">({values.rating}/5)</span>
                  )}
                </div>
                <ErrorMessage name="rating" component="div" className="text-danger small mt-1" />
              </div>

              {/* Comment Textarea */}
              <div className="mb-4">
                <label htmlFor="comment" className="form-label fw-bold">
                  Your Review *
                </label>
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  className={`form-control ${touched.comment && errors.comment ? 'is-invalid' : ''}`}
                  rows="5"
                  placeholder="Share your thoughts about this orchid... (min 10 characters)"
                  style={{ resize: 'vertical' }}
                />
                <div className="d-flex justify-content-between mt-1">
                  <ErrorMessage name="comment" component="div" className="text-danger small" />
                  <small className="text-muted">
                    {values.comment.length}/500 characters
                  </small>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    padding: '12px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: '50px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  className="submit-feedback-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : (
                    '📮 Submit Feedback'
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <style jsx>{`
          .submit-feedback-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
          .submit-feedback-btn:active:not(:disabled) {
            transform: translateY(0);
          }
        `}</style>
      </Card.Body>
    </Card>
  );
};

FeedbackForm.propTypes = {
  orchidId: PropTypes.string.isRequired,
  existingFeedback: PropTypes.array,
  onSubmitFeedback: PropTypes.func.isRequired,
};

export default FeedbackForm;
