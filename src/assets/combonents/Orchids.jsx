import { ListOfOrchids } from '../share/ListOfOrchids';
import { useState } from 'react';
import OrchidItem from './OrchidItem';
import { useTheme } from '../../hooks/useTheme';
import '../css/theme.css';

export default function Orchids() {
  const [orchids, setOrchids] = useState(ListOfOrchids);
  const { theme, toggleTheme } = useTheme();
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  return (
    <div className="container-fluid mt-4">
      <button className="theme-toggle-btn" onClick={toggleTheme}> {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'} </button>
      <h2 className="text-center mb-4 d-flex justify-content-center">🌸 List of Orchids</h2>
      <div className="text-center mb-3">
        <select onChange={(e) => {
          const value = e.target.value;
          if (value === "Natural") {
            setOrchids(ListOfOrchids.filter(o => o.isNatural === true));

          } else if (value === "Special") {
            setOrchids(ListOfOrchids.filter(o => o.isSpecial === true));

          } else {
            setOrchids(ListOfOrchids);
            // All 
          }
        }} >
          <option value="All">All</option>
          <option value="Natural">Natural</option>
          <option value="Special">Special</option>
        </select>

      </div> <div className="row justify-content-center">
        {orchids.map((orchid) => (
          <div key={orchid.id} className="col-md-3 col-sm-6 mb-4">

            <img
              src={"imgs/" + orchid.image}
              alt={orchid.name}
              className="img-fluid rounded shadow"
              style={{ height: '250px' }}
            />
            <h4 className="text-center">{orchid.name}</h4>
            <button className="btn btn-outline-primary" onClick={() => setSelectedOrchid(orchid)} >
              <i className="bi bi-info-circle me-1"></i>
              Detail </button> </div>
        ))}
        #-- Modal for displaying orchid details ---
        {selectedOrchid && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div
                className="modal-content"
                style={{
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">{selectedOrchid.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSelectedOrchid(null)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row align-items-center">
                    {/* Ảnh bên trái */}
                    <div className="col-md-6 text-center">
                      <img
                        src={"imgs/" + selectedOrchid.image}
                        alt={selectedOrchid.name}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: '300px' }}
                      />
                    </div>

                    {/* Thông tin bên phải */}
                    <div className="col-md-6">
                      <p><strong>Origin:</strong> {selectedOrchid.origin}</p>
                      <p><strong>Color:</strong> {selectedOrchid.color}</p>
                      <p><strong>Category:</strong> {selectedOrchid.category}</p>
                      <p><strong>Rating:</strong> {selectedOrchid.rating}⭐</p>
                      <p>{selectedOrchid.isSpecial ? "🌟 Special Orchid" : "Regular Orchid"}</p>
                      <p>{selectedOrchid.isNatural ? "Natural" : "Hybrid"}</p>
                      <p>❤️ {selectedOrchid.numberOfLike} likes</p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setSelectedOrchid(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}