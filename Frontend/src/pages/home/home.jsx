import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import googlePlusIcon from '../../public/googlePlusIcon.png';
import './home.css';
import { getForms } from '../../api'; // getForm импорт хийсэн

export default function Home() {

  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("User");
        if (!storedUser) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        if (!user || !user.id) {
          setLoading(false);
          return;
        }
        
        // getForm функц ашиглаж байна
        const response = await getForms(user.id);
        if (response && response.data && response.data.forms) {
          setForms(response.data.forms);
        }
        
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
    fetchForms();
  }, []);

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

      <div className="recent-section">
        <h2>Recent forms</h2>
        <div className="recent-forms-container">
          {loading ? (
            <div className="data-message">
              <p>Loading...</p>
            </div>
          ) : forms.length > 0 ? (
            <div className="forms-grid">
              {forms.map(form => (
                <div 
                  key={form._id} 
                  className="form-card"
                  onClick={() => navigate(`/fill/${form._id}`)}
                >
                  <div className="form-card-content">
                    <h3>{form.title}</h3>
                    <p className="form-date">
                      {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="data-message">
              <p>No Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
