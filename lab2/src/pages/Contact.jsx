import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Contact</h3>
              <p className="card-text">If you'd like to inquire about an orchid or collaboration, please reach out:</p>

              <ul className="list-unstyled">
                <li><strong>Email:</strong> orchids@example.com</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                <li><strong>Address:</strong> 123 Orchid Lane, Flower City</li>
              </ul>

              <p className="mt-3">You can also go back to the list to view more orchids.</p>
              <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
