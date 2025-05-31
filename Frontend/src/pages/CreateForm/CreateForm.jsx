import { useState } from 'react';                                          // required thing
import styles from './CreateForm.module.css';
import { useNavigate } from "react-router-dom";

import FormTitle from '../../components/FormTitle/FormTitle';                //components that calling
import Notification from '../../components/ux/Notification/Notification';
import ConfirmDialog from '../../components/ux/Confirm/ConfirmDialog';
import QuestionInput from '../../components/QuestionInput/QuestionInput';

import {saveForm} from "../../api"                                         // function to request to backend (i guess)

function CreateForm({logged}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', id: null });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
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


  ////////////////////// //////////////////////  //////////////////////  //////////////////////  //////////////////////  //////////////////////
    const handleSaveForm = async () => {
      const storedUser = sessionStorage.getItem("User");
      
      if (!storedUser) {
        console.log("User not found in sessionStorage",storedUser);  // ene bol auth bug shv (bug1)
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;           // ene nileed utagagui um shig bnle

      if (!userId) {
        console.log("User ID is missing");
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
    const formData = {
      title,
      description,
      questions,
    };

    setIsLoading(true);

    try {
      await saveForm(userId, formData); // save on server > dataBase        ((bug2) not working when updating just forced to save to dataBase(...newData) // solution(programm needed by id))

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
