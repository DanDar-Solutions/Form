import { useState } from 'react';
import styles from './CreateForm.module.css';
import { useNavigate, useLocation } from "react-router-dom";

import FormTitle from '../../components/FormTitle/FormTitle';
import Notification from '../../components/ux/Notification/Notification';
import ConfirmDialog from '../../components/ux/Confirm/ConfirmDialog';
import QuestionInput from '../../components/QuestionInput/QuestionInput';

import {saveForm} from "../../api"

function CreateForm({logged}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const authCheck = () => {
    console.log(logged)
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
      setNotification({
        message: 'Question deleted successfully',
        type: 'success'
      });
    }
  };


  ////////////////////// //////////////////////  //////////////////////  //////////////////////  //////////////////////  //////////////////////
    const handleSaveForm = async () => {
      const storedUser = sessionStorage.getItem("User");
      console.log("form:",questions);
      
      if (!storedUser) {
        console.log("User not found in sessionStorage");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;

      if (!userId) {
        console.log("User ID is missing");
        return;
      }

      console.log("User ID:", userId);
      console.log("User data:", user);

      // title baina uu?
      if (!title.trim()) {
        setNotification({
          message: 'Please enter a form title',
          type: 'error'
        });
        return;
      }
  
    // if > no question
    if (questions.length === 0) {
      setNotification({
        message: 'Please add at least one question',
        type: 'error'
      });
      return;
    }

    // if question is empty
    const invalidQuestions = questions.filter(q => !q.text.trim());
    if (invalidQuestions.length > 0) {
      setNotification({
        message: 'Please fill in all question texts',
        type: 'error'
      });
      return;
    }

    // data scheme
    const formData = {
      title,
      description,
      questions,
    };

    setIsLoading(true);

    try {
      await saveForm(userId, formData); // save on server > dataBase

      setNotification({
        message: 'Form saved successfully!',
        type: 'success'
      });

    } catch (error) {
      setNotification({
        message: 'Error saving form: ' + (error.message || 'Unknown error'),
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  ////////////////////// //////////////////////  //////////////////////  //////////////////////  //////////////////////  //////////////////////


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

  return (
    <div className={styles.container}>
      <h1>Create a New Form</h1>

      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: '', type: '' })}
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

        {questions.length > 0 && (
          <div className={styles.dragInstructions}>
            <p>Questions cannot be reordered without drag & drop.</p>
          </div>
        )}

        <div>
          {questions.map(question => {
            return(
              <QuestionInput 
              key={question.id}
              id={question.id}
              question={question}
              onQuestionChange={(updatedQ) => updateQuestion(question.id, updatedQ)}
              onDelete={() => confirmDeleteQuestion(question.id)}
              />
          
            )})}
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
              handleSaveForm();
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Form'}
          </button>

        </div>

      </div>
    </div>
  );
}

export default CreateForm;
