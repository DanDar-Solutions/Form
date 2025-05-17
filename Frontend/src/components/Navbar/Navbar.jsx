import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Form Builder</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/create">Create Form</Link>
        </li>
        <li>
          <Link to="/forms">My Forms</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 