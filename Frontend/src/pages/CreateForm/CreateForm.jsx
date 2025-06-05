import { useState } from 'react';                                          // required thing
import styles from './CreateForm.module.css';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import FormTitle from '../../components/FormTitle/FormTitle';              //components that calling
import Notification from '../../components/ux/Notification/Notification';
import ConfirmDialog from '../../components/ux/Confirm/ConfirmDialog';
import SortableQuestionItem from '../../components/QuestionInput/SortableQuestionItem';

import {saveForm} from "../../api"                                         // function to request to backend (i guess)

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';          // DnD kit
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'; // DnD kit
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';                                                              // DnD kit

function CreateForm({ logged }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', id: null });
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPublishedConfirm, setShowPublishedConfirm] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [formLink, setFormLink] = useState('');


  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  //////////////////////////////////////// DnD kit ////////////////////////////////////////
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
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        setNotification({
          message: 'Question order updated',
          type: 'success',
          id: Date.now()
        });
        
        return newOrder;
      });
    }
  };
  //////////////////////////////////////// DnD kit ////////////////////////////////////////
  
  const authCheck = () => {
    if (!logged) {
      navigate("/auth");  // just call it directly
    }
  };

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
      
      const notificationId = Date.now();
      setNotification({
        message: 'Question deleted successfully',
        type: 'success',
        id: notificationId
      });
    }
  };

  const confirmClearForm = () => {
    setTitle('');
    setDescription('');
    setQuestions([]);
    setShowLeaveConfirm(false);
    setNotification({
      message: 'Form cleared',
      type: 'info',
      id: Date.now()
    });
  };    
  ////////////////////// //////////////////////  //////////////////////  //////////////////////  //////////////////////  //////////////////////
  const handleSaveForm = async () => {
    const storedUser = localStorage.getItem("User");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    const userId = user?.id;
    if (!userId) {
      console.log("User ID is missing",userId);
      return;
          }
          
          // title baina uu?
          if (!title.trim()) {
            setNotification({
              message: 'Please enter a form title',
              type: 'error',
              id: Date.now()
            });
            return;
          }
          
          // if > no question
          if (questions.length === 0) {
            setNotification({
              message: 'Please add at least one question',
              type: 'error',
              id: Date.now()
            });
            return;
          }
          
          // if question is empty
          const invalidQuestions = questions.filter(q => !q.text.trim());
          if (invalidQuestions.length > 0) {
            setNotification({
              message: 'Please fill in all question texts',
              type: 'error',
              id: Date.now()
            });
            return;
          }
          
          // data scheme
          const formId = uuidv4();
          const formData = {
            title,
            description,
            questions,
            formId
          };
          console.log(formId)
          setFormLink(`localhost:5173/fill/${formId}`)
          
          setIsLoading(true);
          try {
      await saveForm(userId, formData); // save on server > dataBase 
      
      setNotification({
        message: 'Form saved successfully!',
        type: 'success',
        id: Date.now()
      });
      
    } catch (error) {
      setNotification({
        message: 'Error saving form: ' + (error.message || 'Unknown error'),
        type: 'error',
        id: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };
  ////////////////////// //////////////////////  //////////////////////  //////////////////////  //////////////////////  //////////////////////
  
  return (
    <div className={styles.container}>
      <h1>Create a New Form</h1>

      <Notification 
        message={notification.message} 
        type={notification.type}
        id={notification.id}
        onClose={() => setNotification({ message: '', type: '', id: null })}
      />

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        confirmText="Delete"
        onConfirm={deleteQuestion}
        onCancel={() => setShowDeleteConfirm(false)}
      />

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

        <div>
          {questions.length > 0 ? (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext 
                items={questions.map(q => q.id)}
                strategy={verticalListSortingStrategy}
              >
                {questions.map(question => (
                  <SortableQuestionItem
                    key={question.id}
                    id={question.id}
                    question={question}
                    onQuestionChange={(updatedQ) => updateQuestion(question.id, updatedQ)}
                    onDelete={() => confirmDeleteQuestion(question.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : null}
        </div>
        
        <div className={styles.formActions}>
          <button 
            className={styles.addButton} 
            onClick={addQuestion}
          >
            Add Question
          </button>
          

          <button 
            className={styles.saveButton} 
            onClick={() => {
              authCheck();
              setShowPublishConfirm(true);
            }}
            disabled={isLoading}
            >

            {isLoading ? 'Loading...' : 'Publish Form'}
          </button>
        </div>
      </div>
      <div>
        <div>
          <ConfirmDialog
              isOpen={showPublishConfirm}
              title="Publish Form"
              message="Are you sure?"
              confirmText="Publish"
              onConfirm={() => {
                confirmClearForm();
                handleSaveForm();
                setShowPublishedConfirm(true)}}
              onCancel={() => {
                setShowLeaveConfirm(false)
                setShowPublishConfirm(false)}}
            />
        </div>
        <div>
          <ConfirmDialog
              isOpen={showPublishedConfirm}
              title="Form Link"
              message={formLink}
              confirmText="Copy"
              onConfirm={() => {
                confirmClearForm
                // copy to clipboard logic can be here later
              }}
              onCancel={() => {
                setShowLeaveConfirm(false)
                setShowPublishConfirm(false)
                setShowPublishedConfirm(false)
              }}
            />
        </div>
      </div>
    </div>
  );
}

export default CreateForm;