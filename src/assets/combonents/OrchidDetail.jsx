import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { ListOfOrchids } from '../share/ListOfOrchids';
import { useTheme } from '../../hooks/useTheme';

export default function OrchidDetail() {
  const { id } = useParams();
  const orchid = ListOfOrchids.find(o => o.id === (id));
  const { theme, toggleTheme } = useTheme();

  if (!orchid) return (
    <div className={`container-fluid mt-5 text-center ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
      <div className={`card p-5 shadow-sm ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
        <button 
          className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'} position-absolute top-0 end-0 m-3`} 
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <p className="display-6 text-danger">❌ Orchid not found.</p>
        <Link to="/" className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-secondary'} mt-3 mx-auto`} style={{width: 'fit-content'}}>← Back</Link>
      </div>
    </div>
  );

  return (
    <div className={`container-fluid py-5 px-4 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
      <div className={`card shadow-lg ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
        {/* Header với nút theme */}
        <div className={`card-header bg-transparent border-0 d-flex justify-content-between align-items-center ${theme === 'dark' ? 'border-secondary' : ''}`}>
          <h2 className="h3 mb-0">{orchid.name}</h2>
          <button 
            className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <div className="card-body">
          <div className="row g-4 align-items-center">
            {/* Ảnh bên trái */}
            <div className={`col-lg-6 text-center border-end border-2 ${theme === 'dark' ? 'border-secondary' : 'border-light-subtle'}`}>
              <div className="position-relative">
                <img
                  src={"/imgs/" + orchid.image}
                  alt={orchid.name}
                  className="img-fluid rounded-3 shadow-sm"
                  style={{ 
                    maxHeight: '400px',
                    objectFit: 'cover'
                  }}
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-primary">
                    ❤️ {orchid.numberOfLike}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin bên phải */}
            <div className="col-lg-6">
              <div className={`card h-100 border-0 ${theme === 'dark' ? 'bg-dark' : ''}`}>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {[
                      { icon: '🌍', label: 'Origin', value: orchid.origin },
                      { icon: '🎨', label: 'Color', value: orchid.color },
                      { icon: '📂', label: 'Category', value: orchid.category },
                      { icon: '⭐', label: 'Rating', value: `${orchid.rating} ⭐` },
                      { 
                        icon: '✨', 
                        label: 'Type', 
                        value: orchid.isSpecial ? "🌟 Special Orchid" : "Regular Orchid",
                        badge: `badge ${orchid.isSpecial ? 'bg-warning' : 'bg-secondary'}`
                      },
                      { 
                        icon: '🌿', 
                        label: 'Nature', 
                        value: orchid.isNatural ? "Natural" : "Hybrid",
                        badge: `badge ${orchid.isNatural ? 'bg-success' : 'bg-info'}`
                      }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className={`list-group-item d-flex justify-content-between align-items-center ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}
                      >
                        <span className="fw-bold">{item.icon} {item.label}</span>
                        <span className={item.badge || ''}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer với nút back */}
        <div className={`card-footer bg-transparent border-0 text-center py-4 ${theme === 'dark' ? 'border-secondary' : ''}`}>
          <Link 
            to="/" 
            className={`btn btn-lg ${theme === 'dark' ? 'btn-outline-light' : 'btn-secondary'}`}
          >
            ← Back to List
          </Link>
        </div>
      </div>
    </div>
  )
}