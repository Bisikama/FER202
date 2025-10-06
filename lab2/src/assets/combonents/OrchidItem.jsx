import React from 'react'
import './OrchidItem.css';

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
        <button 
          className="btn btn-primary btn-sm w-100"
          onClick={() => onShowDetail(orchid)}
        >
          <i className="fas fa-info-circle me-1"></i>
          View Details
        </button>
      </div>
    </div>
  )
}
