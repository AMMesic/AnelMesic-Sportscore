import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className="nav">
        <Link to="/" >Home</Link>
        <Link to="/search" ></Link>
        <Link to="/livescore" ></Link>
      </nav>
    </div>
  )
}

export default Header;