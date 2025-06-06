import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; // For Preview/View
import PaletteIcon from '@mui/icons-material/Palette'; // For Theme/Color
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import './Navbar.css';
import userIcon from '../../public/default user icon.svg';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplayIcon from '@mui/icons-material/Replay'; // For Undo
import RefreshIcon from '@mui/icons-material/Refresh'; // For Redo
import Divider from '@mui/material/Divider'; // For separating sections in the menu
import Dialog from '@mui/material/Dialog'; // For dialogs
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // For input fields
import Table from '@mui/material/Table'; // For shortcuts table
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'; // For table container
import * as React from 'react';
import { useReactToPrint } from 'react-to-print';

const options = [
  'Хувилах',
  'Хогийн сав руу зөөх',
  'Урьдчилан бөглөх маягт',
  'HTML оруулах',
  'Хэвлэх',
  'Apps Script',
  'Нэмэлтийг суулгах',
  'Маягтыг нийтлэхээ болих',
  'Гарын товчлолууд',
];

const fontOptions = [
  { label: 'Roboto', size: '24' },
  { label: 'Asulit', size: '12' },
  { label: 'Roboto', size: '11' },
];

const colorOptions = [
  '#800080', '#FF0000', '#0000FF', '#00FFFF', '#FFA500',
  '#00FF00', '#808080', '#FFA07A', '#98FB98', '#DDA0DD',
];

const backgroundColorOptions = [
  '#E6E6FA', '#D3D3D3', '#FFFFFF',
];

// Define keyboard shortcuts data
const shortcuts = [
  { action: 'Хуулах', shortcut: 'Ctrl + C' },
  { action: 'Буулгах', shortcut: 'Ctrl + V' },
  { action: 'Бүгдийг сонгох', shortcut: 'Ctrl + A' },
  { action: 'Хайх', shortcut: 'Ctrl + F' },
  { action: 'Хэвлэх', shortcut: 'Ctrl + P' },
  { action: 'Шинэ таб нээх', shortcut: 'Ctrl + T' },
  { action: 'Таб хаах', shortcut: 'Ctrl + W' },
  { action: 'Undo', shortcut: 'Ctrl + Z' },
  { action: 'Redo', shortcut: 'Ctrl + Y' },
  { action: 'Табуудыг сэргээх', shortcut: 'Ctrl + Shift + T' },
];

const ITEM_HEIGHT = 48;

function LongMenu({ onDeleteForm }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [trashDialogOpen, setTrashDialogOpen] = React.useState(false); // State for trash dialog
  const [htmlDialogOpen, setHtmlDialogOpen] = React.useState(false); // State for HTML dialog
  const [printDialogOpen, setPrintDialogOpen] = React.useState(false); // State for print dialog
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = React.useState(false); // State for shortcuts dialog
  const navigate = useNavigate(); // Hook for navigation
  const [iframeSrc, setIframeSrc] = React.useState(''); // State for iframe source URL
  const [iframeWidth, setIframeWidth] = React.useState('640'); // State for iframe width
  const [iframeHeight, setIframeHeight] = React.useState('691'); // State for iframe height
  const componentRef = React.useRef(); // Ref for print content

  // Use react-to-print hook
  const handlePrintAction = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setPrintDialogOpen(false), // Close dialog after printing
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle moving to trash
  const handleMoveToTrash = () => {
    setTrashDialogOpen(true);
    handleClose();
  };

  // Handle trash dialog close
  const handleTrashDialogClose = () => {
    setTrashDialogOpen(false);
  };

  // Handle restore from trash
  const handleRestore = () => {
    console.log('File restored from trash');
    setTrashDialogOpen(false);
    // Add your restore logic here
  };

  // Handle navigate to form home and permanent delete
  const handleGoToFormHome = () => {
    onDeleteForm(); // Delete the form
    setTrashDialogOpen(false);
    navigate('/'); // Navigate to the home page (adjust the path as needed)
  };

  // Handle opening HTML dialog
  const handleInsertHTML = () => {
    setHtmlDialogOpen(true);
    handleClose();
  };

  // Handle HTML dialog close
  const handleHtmlDialogClose = () => {
    setHtmlDialogOpen(false);
    setIframeSrc(''); // Reset iframe src on close
    setIframeWidth('640'); // Reset width to default
    setIframeHeight('691'); // Reset height to default
  };

  // Handle cancel button in HTML dialog
  const handleCancel = () => {
    setHtmlDialogOpen(false);
    setIframeSrc(''); // Reset iframe src on cancel
    setIframeWidth('640'); // Reset width to default
    setIframeHeight('691'); // Reset height to default
  };

  // Handle copy button in HTML dialog
  const handleCopy = () => {
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeHKI3MUhNfLKLs'; // Example URL
    setIframeSrc(googleFormUrl);
    // Simulate copying to clipboard (in a real app, use navigator.clipboard)
    const iframeCode = `<iframe src="${googleFormUrl}" width="${iframeWidth}" height="${iframeHeight}"></iframe>`;
    console.log(`Copied iframe code: ${iframeCode}`);
  };

  // Handle opening print dialog
  const handlePrint = () => {
    setPrintDialogOpen(true);
    handleClose();
  };

  // Handle cancel print
  const handleCancelPrint = () => {
    setPrintDialogOpen(false);
  };

  // Handle Apps Script button click
  const handleAppsScript = () => {
    window.open('https://script.google.com/u/0/home/projects/1TWb-wL4f0bpdcgd2nd5RFo234CMnBQIZ-jwSakoiPGXrOMKz-VdmqRcV/edit', '_blank');
    handleClose();
  };

  // Handle opening shortcuts dialog
  const handleShortcuts = () => {
    setShortcutsDialogOpen(true);
    handleClose();
  };

  // Handle shortcuts dialog close
  const handleShortcutsDialogClose = () => {
    setShortcutsDialogOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {MoreVertIcon ? <MoreVertIcon /> : 'Menu'} {/* Debug fallback */}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 8.5,
              width: '30ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Урьдчилан бөглөх маягт'}
            onClick={() => {
              if (option === 'Хогийн сав руу зөөх') {
                handleMoveToTrash();
              } else if (option === 'HTML оруулах') {
                handleInsertHTML();
              } else if (option === 'Хэвлэх') {
                handlePrint();
              } else if (option === 'Apps Script') {
                handleAppsScript();
              } else if (option === 'Гарын товчлолууд') {
                handleShortcuts();
              } else {
                handleClose();
              }
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {/* Trash Dialog */}
      <Dialog open={trashDialogOpen} onClose={handleTrashDialogClose}>
        <DialogTitle>Хогийн сав руу зөөсөн</DialogTitle>
        <DialogContent>
          <p>Файлыг хогийн сав руу зөөсөн</p>
          <p>
            "Гарчиггүй маягт"-г 30 хоногийн дараа үүрд устгана. Хэрэв энэ файлыг хуваалцсан бол хувь нэмэр
            оруулагчид үүнийг бүрмөсөн устгах хүртэл хуулбарлаж болно.
          </p>
          <p>Энэ файланд хандахын тулд хогийн савнаас гаргана уу.</p>
          <a href="https://support.google.com/drive/answer/2375102?visit_id=638846202952551545-2191110364&p=restore_trash&rd=1#restore_trash">
            <p>Дэлгэрэнгүй үзэх</p>
          </a>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestore} color="primary">
            Хогийн савнаас гаргах
          </Button>
          <Button onClick={handleGoToFormHome} color="primary" autoFocus>
            Маягтын нүүр хуудас руу очих
          </Button>
        </DialogActions>
      </Dialog>
      {/* HTML Dialog */}
      <Dialog open={htmlDialogOpen} onClose={handleHtmlDialogClose}>
        <DialogTitle>HTML оруулах</DialogTitle>
        <DialogContent>
          {!iframeSrc ? (
            <div>
              <p>Дараах iframe-г хуулна уу: <code><iframe src=""></iframe></code></p>
              <TextField
                label="Өргөн (px)"
                value={iframeWidth}
                onChange={(e) => setIframeWidth(e.target.value)}
                type="number"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Өндөр (px)"
                value={iframeHeight}
                onChange={(e) => setIframeHeight(e.target.value)}
                type="number"
                margin="normal"
                fullWidth
              />
            </div>
          ) : (
            <iframe
              src={iframeSrc}
              width={iframeWidth}
              height={iframeHeight}
              title="Google Form"
              style={{ border: 'none' }}
            >
              Ачаалж байна…
            </iframe>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Цуцлах
          </Button>
          <Button onClick={handleCopy} color="primary" autoFocus>
            Хуулах
          </Button>
        </DialogActions>
      </Dialog>
      {/* Print Dialog */}
      <Dialog open={printDialogOpen} onClose={handleCancelPrint}>
        <DialogTitle>Хэвлэх</DialogTitle>
        <DialogContent>
          <div
            ref={componentRef}
            style={{ padding: '20px' }}
          >
            <h2>Танай Маягтын Мэдээлэл</h2>
            <p>03:07 PM +08, Thursday, June 05, 2025</p>
            <p>Зөвхөн энэ хэсэг хэвлэгдэнэ. Dialog-ийн бусад хэсэг хэвлэгдэхгүй.</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPrint} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePrintAction} color="primary" autoFocus>
            Print
          </Button>
        </DialogActions>
      </Dialog>
      {/* Shortcuts Dialog */}
      <Dialog open={shortcutsDialogOpen} onClose={handleShortcutsDialogClose}>
        <DialogTitle>Гарын товчлолууд</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Үйлдэл</TableCell>
                  <TableCell align="right">Товчлол</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shortcuts.map((row) => (
                  <TableRow key={row.action}>
                    <TableCell component="th" scope="row">
                      {row.action}
                    </TableCell>
                    <TableCell align="right">{row.shortcut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShortcutsDialogClose} color="primary" autoFocus>
            Хаах
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function PaletteMenu({ onFontChange, onColorChange, onBackgroundColorChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFontSelect = (font, size) => {
    onFontChange({ font, size });
    handleClose();
  };

  const handleColorSelect = (color) => {
    onColorChange(color);
    handleClose();
  };

  const handleBackgroundColorSelect = (color) => {
    onBackgroundColorChange(color);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="theme"
        className="action-icon"
        onClick={handleClick}
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        id="palette-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: '250px',
            },
          },
        }}
      >
        <div style={{ padding: '8px 16px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>ТЕКСТЫН ХЭЛБЭР (Text Style)</h4>
          {fontOptions.map((option) => (
            <MenuItem
              key={`${option.label}-${option.size}`}
              onClick={() => handleFontSelect(option.label, option.size)}
            >
              {option.label} - {option.size}
            </MenuItem>
          ))}
        </div>
        <Divider />
        <div style={{ padding: '8px 16px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>ТОНИЙН ХЭЛБЭР (Color)</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {colorOptions.map((color) => (
              <div
                key={color}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: color === '#800080' ? '2px solid black' : '1px solid #ccc',
                }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
        <Divider />
        <div style={{ padding: '8px 16px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>ДЭВСГЭР ӨНГӨ (Background Color)</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {backgroundColorOptions.map((color) => (
              <div
                key={color}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: color,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  border: color === '#E6E6FA' ? '2px solid black' : '1px solid #ccc',
                }}
                onClick={() => handleBackgroundColorSelect(color)}
              />
            ))}
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default function Navbar() {
  const [formStyles, setFormStyles] = React.useState({
    font: { label: 'Roboto', size: '24' },
    color: '#800080',
    backgroundColor: '#E6E6FA',
  });

  const [history, setHistory] = React.useState([]);
  const [redoStack, setRedoStack] = React.useState([]);

  // Simulate a current form (replace with actual form data in your app)
  const [currentForm, setCurrentForm] = React.useState({
    id: 1,
    title: 'Гарчиггүй маягт',
  });

  // Function to delete the current form
  const handleDeleteForm = () => {
    console.log(`Form ${currentForm.title} (ID: ${currentForm.id}) permanently deleted`);
    setCurrentForm(null); // Simulate deletion by clearing the form
    // Add your actual delete logic here (e.g., API call to delete the form)
  };

  // Deep copy helper to avoid reference issues
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  // Style changes handler
  const updateStyle = (newStyles) => {
    console.log('Saving to history:', deepCopy(formStyles));
    setHistory((prev) => [...prev, deepCopy(formStyles)]); // Save current state to history
    setRedoStack([]); // Clear redo stack on new change
    setFormStyles((prev) => {
      const updatedStyles = { ...prev, ...newStyles };
      console.log('Updated styles:', updatedStyles);
      return updatedStyles;
    }); // Update form styles
  };

  const handleFontChange = (font) => updateStyle({ font });
  const handleColorChange = (color) => updateStyle({ color });
  const handleBackgroundColorChange = (backgroundColor) => updateStyle({ backgroundColor });

  const handleUndo = () => {
    if (history.length === 0) return;
    const prevStyle = history[history.length - 1];
    console.log('Undoing to:', prevStyle);
    setHistory((prev) => prev.slice(0, -1)); // Remove last history entry
    setRedoStack((prev) => [deepCopy(formStyles), ...prev]); // Add current state to redo stack
    setFormStyles(prevStyle); // Restore previous state
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextStyle = redoStack[0];
    console.log('Redoing to:', nextStyle);
    setHistory((prev) => [...prev, deepCopy(formStyles)]); // Add current state to history
    setRedoStack((prev) => prev.slice(1)); // Remove first redo entry
    setFormStyles(nextStyle); // Restore next state
  };

  // Debug: Log history and redoStack changes
  React.useEffect(() => {
    console.log('History:', history);
    console.log('Redo Stack:', redoStack);
  }, [history, redoStack]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/">Form clone GANG</Link>
        </div>
        <div className="navbar-actions">
          <button
            className="action-button"
            onClick={handleUndo}
            disabled={history.length === 0}
            aria-label="undo"
          >
            <ReplayIcon />
          </button>
          <button
            className="action-button"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            aria-label="redo"
          >
            <RefreshIcon />
          </button>
          <PaletteMenu
            onFontChange={handleFontChange}
            onColorChange={handleColorChange}
            onBackgroundColorChange={handleBackgroundColorChange}
          />
          <LongMenu onDeleteForm={handleDeleteForm} />
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
          <Link to="/auth">
            <img src={userIcon} alt="User Icon" className="user-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}