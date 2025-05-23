import { Link } from 'react-router-dom';
import './Navbar.css';
import userIcon from '../../public/default user icon.svg';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Form clone GANG</Link>
      </div>
      <ul className="navLinks">
        <li>
          <Link to="/">Create Form</Link>
        </li>
        <li>
          <Link to="/ViewResponses">Responses</Link>
        </li>
        <li>
          <Link to="/auth">
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
