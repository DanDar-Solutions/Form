import { useState, useEffect } from 'react';
import './Swap.css';

export default function Swap({ options = [], onChange }) {
  const [items, setItems] = useState(options || []);
  const [draggedItem, setDraggedItem] = useState(null);
  
  useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(items)) {
      setItems(options);
    }
  }, [options]);
  
  const addItem = () => {
    const newItems = [...items, { id: Date.now(), text: '' }];
    setItems(newItems);
    onChange(newItems);
  };
  
  const updateItem = (id, text) => {
    const newItems = items.map(item => item.id === id ? { ...item, text } : item);
    setItems(newItems);
    onChange(newItems);
  };
  
  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    onChange(newItems);
  };
  
  const handleDragStart = (id) => {
    setDraggedItem(id);
  };
  
  const handleDragOver = (e, id) => {
    e.preventDefault();
  };
  
  const handleDrop = (targetId) => {
    if (draggedItem === null || draggedItem === targetId) {
      setDraggedItem(null);
      return;
    }
    
    const sourceIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);
    
    const newItems = [...items];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    setItems(newItems);
    onChange(newItems);
    setDraggedItem(null);
  };
  
  return (
    <div className="swapWrapper">
      <h4>Drag to Reorder Items</h4>
      
      <div className="swapItemsList">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`swapItem ${draggedItem === item.id ? 'dragging' : ''}`}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={e => handleDragOver(e, item.id)}
            onDrop={() => handleDrop(item.id)}
          >
            <div className="dragHandle">
              ⋮⋮
            </div>
            <input
              type="text"
              className="swapInput"
              value={item.text}
              onChange={e => updateItem(item.id, e.target.value)}
              placeholder="Item text"
            />
            <button 
              className="removeButton"
              onClick={() => removeItem(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
      
      <button className="addButton" onClick={addItem}>
        Add Item
      </button>
      
      {items.length > 0 && (
        <div className="swapPreview">
          <h4>Preview</h4>
          <ul className="swapPreviewList">
            {items.map(item => (
              <li key={item.id} className="swapPreviewItem">
                {item.text || 'Untitled item'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
