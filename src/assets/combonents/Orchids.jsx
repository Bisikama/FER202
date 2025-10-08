import { ListOfOrchids } from '../share/ListOfOrchids';
import { useState } from 'react';
import OrchidItem from './OrchidItem';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import '../css/theme.css';

export default function Orchids() {
  const [orchids, setOrchids] = useState(ListOfOrchids);
  const { theme, toggleTheme } = useTheme();
  // const [selectedOrchid, setSelectedOrchid] = useState(null);
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
            <button className="btn btn-outline-primary">
              <Link to={`/detail/${orchid.id}`} className="text-decoration-none">
                <i className="bi bi-info-circle me-1"></i> Detail
              </Link>
            </button>

          </div>
        ))}
  

      </div>
    </div>
  )
}