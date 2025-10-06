import React from 'react'
import './OrchidItem.css';
import { Link } from 'react-router-dom';

export default function OrchidItem({ orchid, onShowDetail }) {
  return (
    <div className="orchid-card">
      <div className="orchid-image-container">
        <img src={"imgs/" + orchid.image} alt={orchid.name} className="orchid-image" />
        {orchid.isSpecial && (
          <span className="special-badge">🌟</span>
        )}
      </div>
      <div className="orchid-info">
        <h5 className="orchid-name">{orchid.name}</h5>
        <div className="rating mb-2">
          {[...Array(5)].map((_, index) => (
            <span 
              key={index} 
              className={index < orchid.rating ? 'star-filled' : 'star-empty'}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="d-grid gap-2">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onShowDetail(orchid)}
          >
            <i className="fas fa-info-circle me-1"></i>
            Quick View
          </button>

          <Link to={`/detail/${orchid.id}`} className="btn btn-outline-primary btn-sm">
            <i className="fas fa-external-link-alt me-1"></i>
            View Details Page
          </Link>
        </div>
      </div>
    </div>
  )
}
