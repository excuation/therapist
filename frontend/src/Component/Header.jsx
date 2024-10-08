import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../Buttons/Logo.jpg';

const Header = ({ profilePicture }) => { // Accept profilePicture as a prop
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery) {
      navigate(`/theripest?query=${encodeURIComponent(searchQuery)}`); // Encode query for URL
    }
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            style={{ textDecoration: 'none' }}
          >
            <img src={Logo} alt="Logo" style={{ width: '40px', height: '32px', marginRight: '8px', borderRadius: '45%' }} />
            <span className="fs-4 text-white"></span>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/places" className="nav-link px-2 text-white">Contact Us</Link></li>
            <li><Link to="/tickets" className="nav-link px-2 text-white">Book Appointment</Link></li>
            <li><Link to="/services" className="nav-link px-2 text-white">Service</Link></li>
            <li><Link to="/help" className="nav-link px-2 text-white">Help</Link></li>
          </ul>

          {/* Search Form */}
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Select Therapist Name"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
          </form>

          <div className="text-end d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/signup" className="btn btn-warning">Sign-up</Link>

            {/* Profile Icon and Dropdown */}
            <div className="dropdown ms-3">
              <button
                className="btn btn-outline-light d-flex align-items-center"
                onClick={toggleDropdown}
              >
                {profilePicture ? ( // Check if profilePicture exists
                  <img
                    src={`http://localhost:5000/${profilePicture}`} // Display profile picture
                    alt="Profile"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <FaUserCircle size={24} />
                )}
              </button>

              {dropdownOpen && (
                <ul className="dropdown-menu dropdown-menu-end show">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/history">History</Link></li>
                  <li><Link className="dropdown-item" to="/signout">Sign Out</Link></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;