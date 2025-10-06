import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ListOfOrchids } from '../assets/share/ListOfOrchids';

export default function Detail() {
  const { id } = useParams();
  const orchid = ListOfOrchids.find(o => o.id === id);

  if (!orchid) {
    return (
      <div className="container py-5">
        <h3>Orchid not found</h3>
        <p>The orchid you're looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-5">
          <img src={`imgs/${orchid.image}`} alt={orchid.name} className="img-fluid rounded shadow-sm" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-7">
          <h2>{orchid.name} <small className="text-muted">#{orchid.id}</small></h2>
          <p className="lead">Category: <strong>{orchid.category}</strong></p>
          <p><strong>Origin:</strong> {orchid.origin}</p>
          <p><strong>Color:</strong> {orchid.color}</p>
          <p><strong>Rating:</strong> {orchid.rating} / 5</p>
          <p><strong>Likes:</strong> {orchid.numberOfLike}</p>
          <div className="mb-3">
            {orchid.isSpecial && <span className="badge bg-warning text-dark me-2">🌟 Special</span>}
            <span className={`badge ${orchid.isNatural ? 'bg-success' : 'bg-info'}`}>{orchid.isNatural ? 'Natural' : 'Hybrid'}</span>
          </div>

          <div className="mt-4">
            <Link to="/" className="btn btn-outline-secondary me-2">Back</Link>
            <Link to="/contact" className="btn btn-primary">Contact Seller</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
