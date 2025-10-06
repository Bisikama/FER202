import React from 'react';

export default function OrchidModal({ orchid, isOpen, onClose }) {
  if (!orchid || !isOpen) return null;

  return (
    <div 
      className={`modal fade ${isOpen ? 'show' : ''}`} 
      style={{ display: isOpen ? 'block' : 'none' }}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="fas fa-seedling me-2"></i>
              {orchid.name}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <img 
                  src={`imgs/${orchid.image}`} 
                  alt={orchid.name} 
                  className="img-fluid rounded shadow-sm mb-3"
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-6">
                <div className="orchid-details">
                  <div className="detail-item mb-3">
                    <h6 className="text-primary mb-1">
                      <i className="fas fa-globe me-2"></i>Origin
                    </h6>
                    <p className="mb-0">{orchid.origin}</p>
                  </div>
                  
                  <div className="detail-item mb-3">
                    <h6 className="text-primary mb-1">
                      <i className="fas fa-palette me-2"></i>Color
                    </h6>
                    <p className="mb-0">{orchid.color}</p>
                  </div>
                  
                  <div className="detail-item mb-3">
                    <h6 className="text-primary mb-1">
                      <i className="fas fa-tag me-2"></i>Category
                    </h6>
                    <p className="mb-0">{orchid.category}</p>
                  </div>
                  
                  <div className="detail-item mb-3">
                    <h6 className="text-primary mb-1">
                      <i className="fas fa-star me-2"></i>Rating
                    </h6>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <span 
                          key={index} 
                          className={index < orchid.rating ? 'text-warning' : 'text-muted'}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="ms-2">({orchid.rating}/5)</span>
                    </div>
                  </div>
                  
                  <div className="detail-item mb-3">
                    <h6 className="text-primary mb-1">
                      <i className="fas fa-heart me-2"></i>Popularity
                    </h6>
                    <p className="mb-0">❤️ {orchid.numberOfLike} likes</p>
                  </div>
                  
                  <div className="detail-item mb-3">
                    <h6 className="text-primary mb-1">
                      <i className="fas fa-leaf me-2"></i>Type
                    </h6>
                    <div>
                      {orchid.isSpecial && (
                        <span className="badge bg-warning text-dark me-2">
                          🌟 Special Orchid
                        </span>
                      )}
                      <span className={`badge ${orchid.isNatural ? 'bg-success' : 'bg-info'}`}>
                        {orchid.isNatural ? '🌿 Natural' : '🧬 Hybrid'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}