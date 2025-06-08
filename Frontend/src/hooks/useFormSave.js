import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveForm } from "../api";

export function useFormSave(onNotification) {
  const [isLoading, setIsLoading] = useState(false);
  const [formLink, setFormLink] = useState('');
  const [showFormLinkDialog, setShowFormLinkDialog] = useState(false);

  const validateForm = (title, questions) => {
    if (!title.trim()) {
      onNotification('Please enter a form title', 'error');
      return false;
    }
    
    if (questions.length === 0) {
      onNotification('Please add at least one question', 'error');
      return false;
    }
    
    const invalidQuestions = questions.filter(q => !q.text.trim());
    if (invalidQuestions.length > 0) {
      onNotification('Please fill in all question texts', 'error');
      return false;
    }
    
    return true;
  };
  
  const handleSaveForm = async (title, description, questions) => {
    const storedUser = localStorage.getItem("User");
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    const userId = user?.id;
    if (!userId) {
      onNotification('User ID is missing', 'error');
      return;
    }
    
    if (!validateForm(title, questions)) {
      return;
    }
    
    const formId = uuidv4();
    const formData = {
      title,
      description,
      questions,
      formId
    };
    
    const link = `localhost:5173/fill/${formId}`;
    setFormLink(link);
    setIsLoading(true);
    
    try {
      await saveForm(userId, formData);
      onNotification('Form saved successfully!', 'success');
      setShowFormLinkDialog(true);
    } catch (error) {
      onNotification('Error saving form: ' + (error.message || 'Unknown error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    formLink,
    showFormLinkDialog,
    setShowFormLinkDialog,
    handleSaveForm
  };
} 