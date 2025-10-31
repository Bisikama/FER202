import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrchids, setFilterCategory, removeOrchid } from '../../store/slices/orchidSlice';
import { useTheme } from '../../hooks/useTheme';
import OrchidForm from './Forms/OrchidForm';
import '../css/theme.css';

export default function Orchids() {
  const dispatch = useDispatch();
  const { filteredOrchids, loading, error, filterCategory } = useSelector((state) => state.orchids);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  
  const [showForm, setShowForm] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  // Fetch orchids khi component mount
  useEffect(() => {
    dispatch(fetchOrchids());
  }, [dispatch]);

  // Handle filter change
  const handleFilterChange = (e) => {
    dispatch(setFilterCategory(e.target.value));
  };

  // Handle delete orchid
  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      alert('⚠️ Please login to delete orchids!');
      return;
    }

    if (window.confirm('Are you sure you want to delete this orchid?')) {
      try {
        await dispatch(removeOrchid(id)).unwrap();
        alert('✅ Orchid deleted successfully!');
      } catch (error) {
        alert('❌ Failed to delete orchid: ' + error);
      }
    }
  };

  // Handle edit orchid
  const handleEdit = (orchid) => {
    if (!isAuthenticated) {
      alert('⚠️ Please login to edit orchids!');
      return;
    }
    setSelectedOrchid(orchid);
    setShowForm(true);
  };

  // Handle add new orchid
  const handleAddNew = () => {
    if (!isAuthenticated) {
      alert('⚠️ Please login to add orchids!');
      return;
    }
    setSelectedOrchid(null);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setSelectedOrchid(null);
  };

  return (
    <div className={`container-fluid mt-4 ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
      {/* Theme Toggle Button */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center flex-grow-1">🌸 List of Orchids</h2>
        {isAuthenticated && (
          <button 
            className="btn btn-success"
            onClick={handleAddNew}
          >
            ➕ Add New Orchid
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="text-center mb-3">
        <select 
          className="form-select w-auto mx-auto"
          value={filterCategory}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Natural">Natural</option>
          <option value="Special">Special</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading orchids...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          ❌ Error: {error}
          <button 
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={() => dispatch(fetchOrchids())}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Orchids Grid */}
      {!loading && !error && (
        <div className="row justify-content-center">
          {filteredOrchids.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="h4">No orchids found</p>
              <p className="text-muted">Try adjusting your filter or add some orchids!</p>
            </div>
          ) : (
            filteredOrchids.map((orchid) => (
              <div key={orchid.id} className="col-md-3 col-sm-6 mb-4">
                <div className={`card h-100 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : ''}`}>
                  <img
                    src={orchid.image}
                    alt={orchid.name}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                    onError={(e) => {
                      // Sử dụng data URL thay vì via.placeholder.com
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="250" height="250"%3E%3Crect fill="%23ddd" width="250" height="250"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{orchid.name}</h5>
                    <p className="card-text text-center">
                      <small className="text-muted">{orchid.category}</small>
                    </p>
                    <div className="d-flex gap-2 flex-wrap justify-content-center">
                      <Link 
                        to={`/detail/${orchid.id}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        👁️ Detail
                      </Link>
                      {isAuthenticated && (
                        <>
                          <button 
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => handleEdit(orchid)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(orchid.id)}
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <OrchidForm
          orchid={selectedOrchid}
          onClose={closeForm}
          onSuccess={() => {
            closeForm();
            dispatch(fetchOrchids());
          }}
        />
      )}
    </div>
  );
}