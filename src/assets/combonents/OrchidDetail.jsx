import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { ListOfOrchids } from '../share/ListOfOrchids';
import { useTheme } from '../../hooks/useTheme';
import '../SCSS/OrchidDetail.scss';

export default function OrchidDetail() {
  const { id } = useParams();
  const orchid = ListOfOrchids.find(o => o.id === (id));
  const { theme, toggleTheme } = useTheme();

  if (!orchid) return (
    <div className={`orchid-detail ${theme}-theme`}>
      <div className="detail-card not-found">
        <button 
          className="theme-btn" 
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <p className="error-message">❌ Orchid not found.</p>
        <Link to="/" className="back-btn">← Back</Link>
      </div>
    </div>
  );

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
                  src={"/imgs/" + orchid.image}
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
      </div>
    </div>
  )
}