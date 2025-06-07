import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import SortableItem from './SortableItem';

export default function Swap({ question, value, onChange }) {
  // Parse items from question data or use defaults
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Try to parse items from question.options if available
    let initialItems = [];
    
    if (Array.isArray(question.options) && question.options.length > 0) {
      // Process each option and extract its text/value
      initialItems = question.options.map((option, index) => {
        // If option is a string that looks like JSON, try to parse it
        if (typeof option === 'string' && option.startsWith('{')) {
          try {
            const parsed = JSON.parse(option);
            return {
              id: parsed.id || `item-${index}`,
              text: parsed.text || option
            };
          } catch (e) {
            // If parsing fails, use the string as is
            return { id: `item-${index}`, text: option };
          }
        } 
        // If option is an object with text property
        else if (typeof option === 'object' && option && option.text) {
          return {
            id: option.id || `item-${index}`,
            text: option.text
          };
        }
        // Default case, use the option as is
        else {
          return { id: `item-${index}`, text: String(option || '') };
        }
      });
    } 
    // If no options, create dummy items from the question text
    else if (question.text) {
      const words = question.text.split(' ');
      initialItems = words.filter(word => word.trim()).map((word, index) => ({
        id: `item-${index}`,
        text: word.trim()
      }));
    }
    // Otherwise, use a default set if nothing available
    else {
      initialItems = [
        { id: 'item-0', text: '3' },
        { id: 'item-1', text: '2' },
        { id: 'item-2', text: '1' }
      ];
    }
    
    setItems(initialItems);
    
    // Set initial value if not already set
    if (!value || !Array.isArray(value) || value.length !== initialItems.length) {
      onChange(initialItems.map(item => item.id));
    }
  }, [question]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex(item => item.id === active.id);
        const newIndex = currentItems.findIndex(item => item.id === over.id);
        
        const newItems = arrayMove(currentItems, oldIndex, newIndex);
        
        // Update the value
        const newOrder = newItems.map(item => item.id);
        onChange(newOrder);
        
        return newItems;
      });
    }
  };

  return (
    <div className="swap-container">
      <p>{question.text}</p>
      
      <div className="swap-items-container">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext 
            items={items.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {item.text}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      
      <div className="swap-preview">
        <h4>Одоогийн дараалал:</h4>
        <ol>
          {items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
