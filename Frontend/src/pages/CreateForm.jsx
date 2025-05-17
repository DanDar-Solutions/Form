import React, { useState } from 'react';
import styles from '../styles/CreateForm.module.css';
import FormTitle from '../components/FormTitle/FormTitle';
import QuestionInput from '../components/QuestionInput/QuestionInput';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Notification from '../components/Notification/Notification';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

function CreateForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Simulating form modification check
  const isFormModified = title !== '' || description !== '' || questions.length > 0;

  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: '', type: 'text', options: [] }
    ]);
  };

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(
      questions.map(q => q.id === id ? { ...q, ...updatedQuestion } : q)
    );
  };

  const confirmDeleteQuestion = (id) => {
    setQuestionToDelete(id);
    setShowDeleteConfirm(true);
  };

  const deleteQuestion = () => {
    if (questionToDelete) {
      setQuestions(questions.filter(q => q.id !== questionToDelete));
      setShowDeleteConfirm(false);
      setQuestionToDelete(null);
      setNotification({
        message: 'Question deleted successfully',
        type: 'success'
      });
    }
  };

  const handleSaveForm = async () => {
    // Form validation
    if (!title.trim()) {
      setNotification({
        message: 'Please enter a form title',
        type: 'error'
      });
      return;
    }

    if (questions.length === 0) {
      setNotification({
        message: 'Please add at least one question',
        type: 'error'
      });
      return;
    }

    // Check if all questions have text
    const invalidQuestions = questions.filter(q => !q.text.trim());
    if (invalidQuestions.length > 0) {
      setNotification({
        message: 'Please fill in all question texts',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      setNotification({
        message: 'Form saved successfully!',
        type: 'success'
      });
      
      // Reset form after successful save (in real app, you'd redirect to the form view)
      // setTitle('');
      // setDescription('');
      // setQuestions([]);
    } catch (error) {
      setNotification({
        message: 'Error saving form: ' + (error.message || 'Unknown error'),
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    if (isFormModified) {
      setShowLeaveConfirm(true);
    }
  };

  const confirmClearForm = () => {
    setTitle('');
    setDescription('');
    setQuestions([]);
    setShowLeaveConfirm(false);
    setNotification({
      message: 'Form cleared',
      type: 'info'
    });
  };

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });

      setNotification({
        message: 'Question order updated',
        type: 'info'
      });
    }
    
    setActiveId(null);
  };

  // Handle drag start event
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Find the active question
  const activeQuestion = questions.find(q => q.id === activeId);

  return (
    <div className={styles.container}>
      <h1>Create a New Form</h1>

      {/* Notification component */}
      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })}
      />

      {/* Delete question confirmation dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        confirmText="Delete"
        onConfirm={deleteQuestion}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Clear form confirmation dialog */}
      <ConfirmDialog
        isOpen={showLeaveConfirm}
        title="Clear Form"
        message="You have unsaved changes. Are you sure you want to clear this form? All your data will be lost."
        confirmText="Clear Form"
        onConfirm={confirmClearForm}
        onCancel={() => setShowLeaveConfirm(false)}
      />

      <div className={styles.formBuilder}>
        <FormTitle 
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />

        {questions.length > 0 && (
          <div className={styles.dragInstructions}>
            <div className={styles.dragIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </div>
            <p>Drag questions to reorder them</p>
          </div>
        )}
        
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={questions.map(q => q.id)} 
            strategy={verticalListSortingStrategy}
          >
            {questions.map(question => (
              <QuestionInput 
                key={question.id}
                id={question.id}
                question={question}
                onQuestionChange={(updatedQ) => updateQuestion(question.id, updatedQ)}
                onDelete={() => confirmDeleteQuestion(question.id)}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <div className={styles.draggingQuestion}>
                <QuestionInput
                  id={activeQuestion.id}
                  question={activeQuestion}
                  onQuestionChange={() => {}}
                  onDelete={() => {}}
                  isDragging
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        
        <div className={styles.formActions}>
          <button 
            className={styles.addButton} 
            onClick={addQuestion}
          >
            Add Question
          </button>
          
          <button 
            className={styles.clearButton}
            onClick={handleClearForm}
          >
            Clear Form
          </button>
          
          <button 
            className={styles.saveButton} 
            onClick={handleSaveForm}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Form'}
          </button>
        </div>

        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
}

export default CreateForm; 