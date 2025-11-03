import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import { setSearchTerm } from '../../store/slices/orchidSlice';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.orchids.searchTerm);
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(localSearch));
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearch('');
  };

  return (
    <div className="mb-4">
      <InputGroup size="lg">
        <InputGroup.Text style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white'
        }}>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search orchids by name..."
          value={localSearch}
          onChange={handleSearchChange}
          style={{
            border: '2px solid #667eea',
            fontSize: '1.1rem',
            padding: '0.75rem'
          }}
        />
        {localSearch && (
          <InputGroup.Text 
            onClick={handleClearSearch}
            style={{ 
              cursor: 'pointer',
              background: '#f8f9fa',
              border: '2px solid #667eea',
              borderLeft: 'none'
            }}
          >
            ✕
          </InputGroup.Text>
        )}
      </InputGroup>
      {localSearch && (
        <small className="text-muted ms-2">
          Searching for: <strong>{localSearch}</strong>
        </small>
      )}
    </div>
  );
};

export default SearchBar;
