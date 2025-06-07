import React, { useState, useEffect } from 'react';
import styles from '../fillForm.module.css';

export default function Connect({ question, value, onChange }) {
  const [connections, setConnections] = useState([]);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  
  // Process question data to create left and right items
  useEffect(() => {
    console.log("Connect component received question:", question);
    let left = [];
    let right = [];
    
    try {
      // First, check if question.connectData exists (stored in DB format)
      if (question.connectData && 
          Array.isArray(question.connectData.left) && 
          Array.isArray(question.connectData.right)) {
        
        left = question.connectData.left.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return { id: item.id || `left-${index}`, text: item.text || '' };
          }
          return { id: `left-${index}`, text: String(item || '') };
        });
        
        right = question.connectData.right.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            return { id: item.id || `right-${index}`, text: item.text || '' };
          }
          return { id: `right-${index}`, text: String(item || '') };
        });
      }
      // Check for leftItems and rightItems fields (from form builder)
      else if (question.leftItems && question.rightItems) {
        left = Array.isArray(question.leftItems) ? 
          question.leftItems.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              return { id: item.id || `left-${index}`, text: item.text || '' };
            }
            return { id: `left-${index}`, text: String(item || '') };
          }) : [];
          
        right = Array.isArray(question.rightItems) ? 
          question.rightItems.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              return { id: item.id || `right-${index}`, text: item.text || '' };
            }
            return { id: `right-${index}`, text: String(item || '') };
          }) : [];
      }
      // If options exist, try to split them into left and right
      else if (Array.isArray(question.options) && question.options.length > 0) {
        // Try to parse options as JSON if they're strings
        const parsedOptions = question.options.map(opt => {
          if (typeof opt === 'string' && (opt.startsWith('{') || opt.startsWith('['))) {
            try {
              return JSON.parse(opt);
            } catch (e) {
              return opt;
            }
          }
          return opt;
        });
        
        // Check if any parsed options have a 'pairs' property
        const pairsData = parsedOptions.find(opt => 
          opt && typeof opt === 'object' && Array.isArray(opt.pairs)
        );
        
        if (pairsData && pairsData.pairs) {
          // Extract left and right items from pairs
          left = pairsData.pairs.map((pair, idx) => ({
            id: `left-${idx}`, 
            text: pair.left || ''
          }));
          
          right = pairsData.pairs.map((pair, idx) => ({
            id: `right-${idx}`, 
            text: pair.right || ''
          }));
        } 
        // Otherwise split options into two groups
        else {
          const midPoint = Math.ceil(parsedOptions.length / 2);
          
          left = parsedOptions.slice(0, midPoint).map((item, index) => {
            if (typeof item === 'object' && item !== null && item.text) {
              return { id: item.id || `left-${index}`, text: item.text };
            }
            return { id: `left-${index}`, text: String(item || '') };
          });
          
          right = parsedOptions.slice(midPoint).map((item, index) => {
            if (typeof item === 'object' && item !== null && item.text) {
              return { id: item.id || `right-${index}`, text: item.text };
            }
            return { id: `right-${index}`, text: String(item || '') };
          });
        }
      }
      
      // Only use fallback demo data if we couldn't extract any items
      if (left.length === 0 || right.length === 0) {
        console.log("Using fallback data for Connect component");
        left = [
          { id: 'left-0', text: 'Mongolia' },
          { id: 'left-1', text: 'Russia' },
          { id: 'left-2', text: 'China' },
        ];
        
        right = [
          { id: 'right-0', text: 'Ulaanbaatar' },
          { id: 'right-1', text: 'Moscow' },
          { id: 'right-2', text: 'Beijing' },
        ];
      }
      
      console.log("Processed connect items:", { left, right });
      setLeftItems(left);
      setRightItems(right);
      
      // Initialize connections from value or empty array
      if (value && Array.isArray(value) && value.length > 0) {
        setConnections(value);
      } else {
        onChange([]);
      }
    } catch (error) {
      console.error("Error processing connect data:", error);
      // Fallback to empty arrays
      setLeftItems([]);
      setRightItems([]);
    }
  }, [question]);
  
  // Handle selection of an item from left column
  const handleLeftSelect = (item) => {
    setSelectedLeft(selectedLeft === item.id ? null : item.id);
  };
  
  // Handle selection of an item from right column
  const handleRightSelect = (item) => {
    // If nothing selected from left, do nothing
    if (!selectedLeft) return;
    
    // Check if this connection already exists
    const existingConnectionIndex = connections.findIndex(
      conn => conn.left === selectedLeft && conn.right === item.id
    );
    
    let newConnections = [...connections];
    
    if (existingConnectionIndex >= 0) {
      // Remove existing connection
      newConnections.splice(existingConnectionIndex, 1);
    } else {
      // Remove any existing connection with the same left item
      newConnections = newConnections.filter(conn => conn.left !== selectedLeft);
      
      // Add new connection
      newConnections.push({
        left: selectedLeft,
        right: item.id
      });
    }
    
    setConnections(newConnections);
    onChange(newConnections);
    setSelectedLeft(null); // Reset selection
  };
  
  // Find the connected right item for a given left item
  const getConnectedRight = (leftId) => {
    const connection = connections.find(conn => conn.left === leftId);
    return connection ? connection.right : null;
  };
  
  // Check if a right item is connected to the currently selected left item
  const isConnectedToSelected = (rightId) => {
    return connections.some(conn => conn.left === selectedLeft && conn.right === rightId);
  };
  
  return (
    <div className={styles.connectContainer}>
      <p>{question.text}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Left column */}
        <div style={{ width: '45%' }}>
          <h4>Зүүн</h4>
          <div>
            {leftItems.map(item => {
              const isConnected = getConnectedRight(item.id) !== null;
              const isSelected = selectedLeft === item.id;
              
              let classNames = styles.connectItem;
              if (isSelected) classNames += ` ${styles.connectSelected}`;
              if (isConnected && !isSelected) classNames += ` ${styles.connectConnected}`;
              
              return (
                <div 
                  key={item.id}
                  onClick={() => handleLeftSelect(item)}
                  className={classNames}
                >
                  {item.text}
                  {isConnected && (
                    <span style={{ float: 'right', color: isSelected ? 'white' : '#4caf50' }}>✓</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Connection lines - visual placeholder */}
        <div style={{ width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ borderLeft: '2px dashed #ccc', height: '100%' }}></div>
        </div>
        
        {/* Right column */}
        <div style={{ width: '45%' }}>
          <h4>Баруун</h4>
          <div>
            {rightItems.map(item => {
              const isConnectedToActive = selectedLeft && isConnectedToSelected(item.id);
              
              let classNames = styles.connectItem;
              if (isConnectedToActive) classNames += ` ${styles.connectSelected}`;
              
              return (
                <div 
                  key={item.id}
                  onClick={() => handleRightSelect(item)}
                  className={classNames}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Current connections */}
      <div className={styles.connectInstructions}>
        <h4>Одоогийн холболтууд:</h4>
        {connections.length === 0 ? (
          <p className={styles.connectHelpText}>Холболт хийгдээгүй байна</p>
        ) : (
          <ul className={styles.gridSelectionList}>
            {connections.map((conn, index) => {
              const leftItem = leftItems.find(item => item.id === conn.left);
              const rightItem = rightItems.find(item => item.id === conn.right);
              
              return (
                <li key={index}>
                  {leftItem?.text} → {rightItem?.text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
