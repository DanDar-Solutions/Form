import { useState, useReducer, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './tNavbar.css';

// SVG Icons
const UndoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 8C9.85 8 7.45 8.99 5.6 10.6L2 7V16H11L7.38 12.38C8.77 11.22 10.54 10.5 12.5 10.5C16.04 10.5 19.05 12.81 20.1 16L22.47 15.22C21.08 11.03 17.15 8 12.5 8Z" fill="currentColor"/>
  </svg>
);

const RedoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8C6.85 8 2.92 11.03 1.54 15.22L3.9 16C4.95 12.81 7.95 10.5 11.5 10.5C13.45 10.5 15.23 11.22 16.62 12.38L13 16H22V7L18.4 10.6Z" fill="currentColor"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C12.83 21 13.5 20.33 13.5 19.5C13.5 19.11 13.35 18.76 13.11 18.49C12.88 18.23 12.73 17.88 12.73 17.5C12.73 16.67 13.4 16 14.23 16H16C18.76 16 21 13.76 21 11C21 6.58 16.97 3 12 3ZM6.5 12C5.67 12 5 11.33 5 10.5C5 9.67 5.67 9 6.5 9C7.33 9 8 9.67 8 10.5C8 11.33 7.33 12 6.5 12ZM9.5 8C8.67 8 8 7.33 8 6.5C8 5.67 8.67 5 9.5 5C10.33 5 11 5.67 11 6.5C11 7.33 10.33 8 9.5 8ZM14.5 8C13.67 8 13 7.33 13 6.5C13 5.67 13.67 5 14.5 5C15.33 5 16 5.67 16 6.5C16 7.33 15.33 8 14.5 8ZM17.5 12C16.67 12 16 11.33 16 10.5C16 9.67 16.67 9 17.5 9C18.33 9 19 9.67 19 10.5C19 11.33 18.33 12 17.5 12Z" fill="currentColor"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="currentColor"/>
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>
);

// Options Menu Component
const OptionsMenu = ({ isOpen, onClose, onDeleteForm }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const handleMoveToTrash = () => {
    if (window.confirm('Энэ маягтыг хогийн саванд хийх үү?')) {
      onDeleteForm();
      navigate('/');
    }
    onClose();
  };
  
  const options = [
    { label: 'Хувилах', action: () => { alert('Хувилагдлаа'); onClose(); } },
    { label: 'Хогийн сав руу зөөх', action: handleMoveToTrash },
    { label: 'Хэвлэх', action: () => { window.print(); onClose(); } },
    { label: 'Гарын товчлолууд', action: () => { alert('Гарын товчлолууд'); onClose(); } },
  ];

  return (
    <div className="options-menu">
      <div className="menu-overlay" onClick={onClose}></div>
      <ul className="menu-items" onClick={(e) => e.stopPropagation()}>
        {options.map((option, index) => (
          <li key={index} onClick={option.action}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Theme Menu Component
const ThemeMenu = ({ isOpen, onClose, onBgColorChange }) => {
  if (!isOpen) return null;

  const bgColors = [
    { color: '#FFFFFF', label: 'White' },
    { color: '#F3E5F5', label: 'Lavender' },
    { color: '#E8EAF6', label: 'Light Blue' },
    { color: '#E0F2F1', label: 'Mint' },
    { color: '#FFF8E1', label: 'Cream' },
    { color: '#FFEBEE', label: 'Light Pink' }
  ];
  const fontOptions = ['Roboto', 'Arial', 'Times New Roman', 'Calibri'];
  const headerSizes = ['24', '28', '32', '36'];
  const questionSizes = ['12', '14', '16', '18'];
  const textSizes = ['11', '12', '14', '16'];
  
  const [selectedFont, setSelectedFont] = useState('Roboto');
  const [headerSize, setHeaderSize] = useState('24');
  const [questionSize, setQuestionSize] = useState('12');
  const [textSize, setTextSize] = useState('11');
  const [activeBgColor, setActiveBgColor] = useState('#FFFFFF');

  const handleBgColorChange = (color) => {
    setActiveBgColor(color);
    onBgColorChange(color);
    // Apply background color directly to the body
    document.body.style.backgroundColor = color;
    // Don't close the menu so user can see the change
  };

  return (
    <div className="theme-menu">
      <div className="menu-overlay" onClick={onClose}></div>
      <div className="theme-content" onClick={(e) => e.stopPropagation()}>
        <div className="theme-header">
          <span>Theme</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <h4 className="section-title">Text style</h4>
        
        <div className="style-section">
          <label>Header</label>
          <div className="font-selectors">
            <select 
              className="font-family-select" 
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
            
            <select 
              className="font-size-select"
              value={headerSize}
              onChange={(e) => setHeaderSize(e.target.value)}
            >
              {headerSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="style-section">
          <label>Question</label>
          <div className="font-selectors">
            <select 
              className="font-family-select" 
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
            
            <select 
              className="font-size-select"
              value={questionSize}
              onChange={(e) => setQuestionSize(e.target.value)}
            >
              {questionSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="style-section">
          <label>Text</label>
          <div className="font-selectors">
            <select 
              className="font-family-select" 
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
            
            <select 
              className="font-size-select"
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
            >
              {textSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="style-section">
          <label>Header</label>
          <button className="image-select-btn">
            <span className="image-icon">📷</span>
            Choose Image
          </button>
        </div>
        
        <h4 className="section-title">Background</h4>
        <div className="background-options">
          {bgColors.map((bgColor, index) => (
            <button 
              key={index}
              className={`bg-btn ${activeBgColor === bgColor.color ? 'active' : ''}`}
              style={{background: bgColor.color}}
              onClick={() => handleBgColorChange(bgColor.color)}
              title={bgColor.label}
            >
              {activeBgColor === bgColor.color && <span className="check-mark">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
function Navbar() {
  const [formStyle, setFormStyle] = useState({
    color: '#800080',
    backgroundColor: '#FFFFFF'
  });
  
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  
  const location = useLocation(); // Get current location
  const isCreateRoute = location.pathname === '/create'; // Check if current path is /create

  // Apply initial background color on component mount
  useEffect(() => {
    if (formStyle.backgroundColor) {
      document.body.style.backgroundColor = formStyle.backgroundColor;
    }
    // Cleanup function to restore original background when component unmounts
    return () => {
      document.body.style.backgroundColor = '#f5f5f5';
    };
  }, []);

  // Handle style changes
  const updateStyle = (changes) => {
    setHistory([...history, {...formStyle}]);
    setRedoStack([]);
    const newStyle = {...formStyle, ...changes};
    setFormStyle(newStyle);
    
    // Apply background color directly to the body
    if (changes.backgroundColor) {
      document.body.style.backgroundColor = changes.backgroundColor;
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    
    const prevStyle = history[history.length - 1];
    setRedoStack([formStyle, ...redoStack]);
    setHistory(history.slice(0, -1));
    setFormStyle(prevStyle);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    const nextStyle = redoStack[0];
    setHistory([...history, formStyle]);
    setRedoStack(redoStack.slice(1));
    setFormStyle(nextStyle);
  };

  const handleDeleteForm = () => {
    console.log('Form deleted');
    // Add actual delete form logic
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/">Form clone GANG</Link>
        </div>
        <div className="navbar-actions">
          {isCreateRoute && (
            <>
              <button 
                className="action-button" 
                onClick={handleUndo} 
                disabled={history.length === 0}
              >
                <UndoIcon />
              </button>
              <button 
                className="action-button" 
                onClick={handleRedo} 
                disabled={redoStack.length === 0}
              >
                <RedoIcon />
              </button>
              <button 
                className="action-button" 
                onClick={() => setThemeMenuOpen(true)}
              >
                <PaletteIcon />
              </button>
              <button 
                className="action-button" 
                onClick={() => setOptionsMenuOpen(true)}
              >
                <MenuIcon />
              </button>
            </>
          )}
        </div>
      </div>
      
      <ul className="navLinks">
        <li>
          <Link to="/create">Create Form</Link>
        </li>
        <li>
          <Link to="/responses/:formId">Responses</Link>
        </li>
        <li>
          <Link to="/fill/:formId">Fill</Link>
        </li>
        <li>
          <Link to="/auth">
            <UserIcon />
          </Link>
        </li>
      </ul>
      
      {isCreateRoute && (
        <>
          <OptionsMenu 
            isOpen={optionsMenuOpen}
            onClose={() => setOptionsMenuOpen(false)}
            onDeleteForm={handleDeleteForm}
          />
          
          <ThemeMenu 
            isOpen={themeMenuOpen}
            onClose={() => setThemeMenuOpen(false)}
            onBgColorChange={(backgroundColor) => updateStyle({backgroundColor})}
          />
        </>
      )}
    </nav>
  );
}

export default Navbar;