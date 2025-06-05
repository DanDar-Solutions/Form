import { useNavigate } from 'react-router-dom';
import googlePlusIcon from '../../public/googlePlusIcon.png';
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header">
        <h1>Start a new form</h1>
      </div>
      
      <div className="templates-container">
        <div className="template-card" onClick={() => navigate('/create')}>
          <div className="template-image-container">
            <img src={googlePlusIcon} alt="Blank Form Template" className="template-image" />
          </div>
          <p className="template-name">Blank form</p>
        </div>
      </div>
    </div>
  );
}