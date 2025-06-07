import React, { useState, useEffect } from 'react';
import styles from '../fillForm.module.css';

export default function MultipleChoiceGrid({ question, value, onChange }) {
  const [gridData, setGridData] = useState({
    rows: [],
    columns: [],
    selections: {}
  });

  useEffect(() => {
    try {
      console.log("MultipleChoiceGrid received question:", question);
      let rows = [];
      let columns = [];
      
      // Try to extract grid data from question
      if (question.gridData && 
          Array.isArray(question.gridData.rows) && 
          Array.isArray(question.gridData.columns)) {
        
        rows = question.gridData.rows.map((row, index) => {
          if (typeof row === 'object' && row !== null) {
            return { id: row.id || `row-${index}`, text: row.text || '' };
          }
          return { id: `row-${index}`, text: String(row || '') };
        });
        
        columns = question.gridData.columns.map((col, index) => {
          if (typeof col === 'object' && col !== null) {
            return { id: col.id || `col-${index}`, text: col.text || '' };
          }
          return { id: `col-${index}`, text: String(col || '') };
        });
      }
      // Try to parse from rows and columns properties
      else if (question.rows && question.columns) {
        rows = Array.isArray(question.rows) ? 
          question.rows.map((row, index) => {
            if (typeof row === 'object' && row !== null) {
              return { id: row.id || `row-${index}`, text: row.text || '' };
            }
            return { id: `row-${index}`, text: String(row || '') };
          }) : [];
          
        columns = Array.isArray(question.columns) ? 
          question.columns.map((col, index) => {
            if (typeof col === 'object' && col !== null) {
              return { id: col.id || `col-${index}`, text: col.text || '' };
            }
            return { id: `col-${index}`, text: String(col || '') };
          }) : [];
      }
      // Try to extract from options
      else if (Array.isArray(question.options) && question.options.length > 0) {
        // Try to find any structured grid data in options
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
        
        // Look for grid data structure
        const gridDataOption = parsedOptions.find(opt => 
          opt && typeof opt === 'object' && 
          (Array.isArray(opt.rows) || Array.isArray(opt.columns))
        );
        
        if (gridDataOption) {
          // Extract rows and columns
          if (Array.isArray(gridDataOption.rows)) {
            rows = gridDataOption.rows.map((row, index) => {
              if (typeof row === 'object' && row !== null) {
                return { id: row.id || `row-${index}`, text: row.text || row.label || '' };
              }
              return { id: `row-${index}`, text: String(row || '') };
            });
          }
          
          if (Array.isArray(gridDataOption.columns)) {
            columns = gridDataOption.columns.map((col, index) => {
              if (typeof col === 'object' && col !== null) {
                return { id: col.id || `col-${index}`, text: col.text || col.label || '' };
              }
              return { id: `col-${index}`, text: String(col || '') };
            });
          }
        }
      }
      
      // Use fallback demo data if needed
      if (rows.length === 0 || columns.length === 0) {
        console.log("Using fallback data for MultipleChoiceGrid");
        rows = [
          { id: 'row-0', text: 'Quality' },
          { id: 'row-1', text: 'Price' },
          { id: 'row-2', text: 'Service' }
        ];
        
        columns = [
          { id: 'col-0', text: 'Poor' },
          { id: 'col-1', text: 'Fair' },
          { id: 'col-2', text: 'Good' },
          { id: 'col-3', text: 'Excellent' }
        ];
      }
      
      console.log("Processed grid data:", { rows, columns });
      
      // Initialize selections from value or empty object
      let selections = {};
      if (value && typeof value === 'object') {
        selections = { ...value };
      }
      
      setGridData({
        rows,
        columns,
        selections
      });
      
    } catch (error) {
      console.error("Error processing grid data:", error);
      // Fallback to empty data
      setGridData({
        rows: [],
        columns: [],
        selections: {}
      });
    }
  }, [question]);

  // Handle radio button selection
  const handleSelect = (rowId, colId) => {
    const newSelections = {
      ...gridData.selections,
      [rowId]: colId
    };
    
    setGridData(prev => ({
      ...prev,
      selections: newSelections
    }));
    
    onChange(newSelections);
  };

  // Get selected column for a row
  const getSelection = (rowId) => {
    return gridData.selections[rowId];
  };

  return (
    <div className={styles.gridContainer}>
      <p>{question.text}</p>
      
      <table className={styles.gridTable}>
        <thead>
          <tr>
            <th className={styles.gridHeaderFirstCell}></th>
            {gridData.columns.map(col => (
              <th key={col.id}>
                {col.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gridData.rows.map(row => (
            <tr key={row.id}>
              <td>{row.text}</td>
              {gridData.columns.map(col => (
                <td key={col.id} className={styles.gridRadioCell}>
                  <label>
                    <input
                      type="radio"
                      name={`grid-${row.id}`}
                      checked={getSelection(row.id) === col.id}
                      onChange={() => handleSelect(row.id, col.id)}
                      className={styles.gridRadioInput}
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className={styles.gridSummary}>
        <h4>Одоогийн сонголтууд:</h4>
        {Object.keys(gridData.selections).length === 0 ? (
          <p className={styles.gridNoSelection}>Сонголт хийгдээгүй байна</p>
        ) : (
          <ul className={styles.gridSelectionList}>
            {Object.entries(gridData.selections).map(([rowId, colId]) => {
              const row = gridData.rows.find(r => r.id === rowId);
              const col = gridData.columns.find(c => c.id === colId);
              
              return (
                <li key={rowId} className={styles.gridSelectionItem}>
                  {row?.text}: <strong>{col?.text}</strong>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
