import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchidById, clearSelectedOrchid } from '../../store/slices/orchidSlice';
import { useTheme } from '../../hooks/useTheme';
import FeedbackList from './FeedbackList';
import FeedbackForm from './FeedbackForm';
import { addFeedbackToOrchid } from '../../services/api';
import '../SCSS/OrchidDetail.scss';

export default function OrchidDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrchid: orchid, loading, error } = useSelector((state) => state.orchids);
  const { theme, toggleTheme } = useTheme();

  // Fetch orchid khi component mount
  useEffect(() => {
    dispatch(fetchOrchidById(id));
    
    // Cleanup khi component unmount
    return () => {
      dispatch(clearSelectedOrchid());
    };
  }, [dispatch, id]);

  // Handler để submit feedback
  const handleSubmitFeedback = async (orchidId, feedbackData) => {
    try {
      await addFeedbackToOrchid(orchidId, feedbackData);
      // Reload orchid để hiển thị feedback mới
      dispatch(fetchOrchidById(orchidId));
    } catch (error) {
      throw new Error(error.message || 'Failed to submit feedback');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`orchid-detail ${theme}-theme`}>
        <div className="detail-card">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading orchid details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !orchid) {
    return (
      <div className={`orchid-detail ${theme}-theme`}>
        <div className="detail-card not-found">
          <button 
            className="theme-btn" 
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
          <p className="error-message">
            {error ? `❌ Error: ${error}` : '❌ Orchid not found.'}
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/" className="back-btn">← Back to List</Link>
            <button 
              className="back-btn" 
              onClick={() => dispatch(fetchOrchidById(id))}
            >
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`orchid-detail ${theme}-theme`}>
      <div className="detail-card">
        {/* Header với nút theme */}
        <div className="card-header">
          <h2>{orchid.name}</h2>
          <button 
            className="theme-btn"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <div className="card-body">
          <div className="content-row">
            {/* Ảnh bên trái */}
            <div className="image-section image-divider">
              <div className="image-container">
                <img
                  src={orchid.image}
                  alt={orchid.name}
                />
                <div className="like-badge">
                  ❤️ {orchid.numberOfLike}
                </div>
              </div>
            </div>

            {/* Thông tin bên phải */}
            <div className="info-section">
              <ul className="info-list">
                <li className="info-item">
                  <span className="label">🌍 Origin</span>
                  <span className="value">{orchid.origin}</span>
                </li>
                <li className="info-item">
                  <span className="label">🎨 Color</span>
                  <span className="value">{orchid.color}</span>
                </li>
                <li className="info-item">
                  <span className="label">📂 Category</span>
                  <span className="value">{orchid.category}</span>
                </li>
                <li className="info-item">
                  <span className="label">⭐ Rating</span>
                  <span className="value">{orchid.rating} ⭐</span>
                </li>
                <li className="info-item">
                  <span className="label">✨ Type</span>
                  <span className={`value badge ${orchid.isSpecial ? 'warning' : 'secondary'}`}>
                    {orchid.isSpecial ? "🌟 Special Orchid" : "Regular Orchid"}
                  </span>
                </li>
                <li className="info-item">
                  <span className="label">🌿 Nature</span>
                  <span className={`value badge ${orchid.isNatural ? 'success' : 'info'}`}>
                    {orchid.isNatural ? "Natural" : "Hybrid"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer với nút back */}
        <div className="card-footer">
          <Link to="/" className="back-btn">
            ← Back to List
          </Link>
        </div>

        {/* Feedback Section */}
        <div className="feedback-section" style={{ padding: '2rem', background: theme === 'dark' ? '#2d3748' : '#f8f9fa' }}>
          <div className="container">
            <div className="row g-4">
              {/* Feedback Form */}
              <div className="col-lg-6">
                <FeedbackForm 
                  orchidId={id}
                  existingFeedback={orchid.feedback || []}
                  onSubmitFeedback={handleSubmitFeedback}
                />
              </div>

              {/* Feedback List */}
              <div className="col-lg-6">
                <FeedbackList feedback={orchid.feedback || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}