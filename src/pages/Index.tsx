import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Dashboard from '@/components/Dashboard/Dashboard';
import Landing from './Landing';
import Questionnaire from './Questionnaire';

const Index = () => {
  const { user } = useAuth();

  // If user is logged in
  if (user) {
    // If user hasn't completed questionnaire, show questionnaire
    if (!user.questionnaireCompleted) {
      return <Questionnaire />;
    }
    // Otherwise show dashboard
    return <Dashboard />;
  }

  // If no user, show landing page
  return <Landing />;
};

export default Index;
