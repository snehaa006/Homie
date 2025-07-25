import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import VoiceInput from '@/components/Questionnaire/VoiceInput';
import homieLogoImg from '@/assets/homie-logo.png';

interface ExtractedPreference {
  trait: string;
  priority: 'high' | 'medium' | 'low';
  isNonNegotiable?: boolean;
}

const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserPreferences } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<ExtractedPreference[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 2;

  const handlePreferencesExtracted = (extractedPrefs: ExtractedPreference[]) => {
    setPreferences(extractedPrefs);
    setCurrentStep(2);
  };

  const handleComplete = () => {
    // Save preferences to user profile
    updateUserPreferences({
      roommatePreferences: preferences,
      questionnaireCompleted: true,
      completedAt: new Date().toISOString()
    });

    setIsComplete(true);
    toast.success('Questionnaire completed! Redirecting to dashboard...');
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleSkip = () => {
    updateUserPreferences({
      questionnaireCompleted: true,
      completedAt: new Date().toISOString()
    });
    
    toast.success('Skipped questionnaire. You can complete it later from settings.');
    navigate('/');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 flex items-center justify-center p-4">
        <Card className="glass-card max-w-md w-full text-center animate-fade-in-up">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-primary">
              All Set! 🎉
            </h2>
            <p className="text-muted-foreground mb-4">
              Your preferences have been saved. We'll use them to find your perfect roommate matches.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Redirecting to dashboard...</span>
              <div className="animate-pulse">●●●</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      {/* Header */}
      <header className="glass-card m-4 p-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => currentStep > 1 ? setCurrentStep(1) : navigate('/auth')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={homieLogoImg} alt="Homie" className="h-8 w-auto" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-sm text-muted-foreground">
                Let's find your perfect roommate
              </p>
            </div>
          </div>
          
          <Button onClick={handleSkip} variant="ghost" className="text-muted-foreground">
            Skip for now
          </Button>
        </div>
      </header>

      {/* Progress */}
      <div className="mx-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {currentStep === 1 && (
          <Card className="glass-card animate-fade-in-up">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                Tell Us About Your Ideal Roommate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <VoiceInput onPreferencesExtracted={handlePreferencesExtracted} />
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="glass-card animate-fade-in-up">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Review Your Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Here's what we learned about your roommate preferences:
                </p>
              </div>

              {/* Preferences Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {preferences.map((pref, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all ${
                      pref.priority === 'high' 
                        ? 'bg-primary/10 border-primary/30' 
                        : pref.priority === 'medium'
                        ? 'bg-secondary/10 border-secondary/30'
                        : 'bg-muted/10 border-muted-foreground/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{pref.trait}</h4>
                      <div className="flex items-center gap-1">
                        {pref.priority === 'high' && <span>🔥</span>}
                        {pref.isNonNegotiable && <span>⚠️</span>}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {pref.priority} priority
                      {pref.isNonNegotiable && ' • Non-negotiable'}
                    </p>
                  </div>
                ))}
              </div>

              {preferences.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No specific preferences were extracted. You can always update these later in your settings.
                  </p>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <Button 
                  onClick={() => setCurrentStep(1)} 
                  variant="outline" 
                  className="flex-1 glass-card"
                >
                  Back to Edit
                </Button>
                <Button 
                  onClick={handleComplete} 
                  className="flex-1 gradient-button"
                >
                  Complete Setup ✨
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;