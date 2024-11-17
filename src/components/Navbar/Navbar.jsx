import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';

import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar__title" to="/">
        <Film size={32} />
        <h1>CINERAMA</h1>
      </Link>
      <Link className="navbar__icon" to="/favourites">
        <Heart size={32} /> {/* Example icon */}
      </Link>
    </nav>
  );
};

export default Navbar;
