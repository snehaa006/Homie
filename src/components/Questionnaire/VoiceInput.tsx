import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface ExtractedPreference {
  trait: string;
  priority: 'high' | 'medium' | 'low';
  isNonNegotiable?: boolean;
}

interface VoiceInputProps {
  onPreferencesExtracted: (preferences: ExtractedPreference[]) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onPreferencesExtracted }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [extractedPreferences, setExtractedPreferences] = useState<ExtractedPreference[]>([]);
  const [additionalInputs, setAdditionalInputs] = useState<string[]>(['']);

  // Keyword mapping for preference extraction
  const preferenceKeywords = {
    cleanliness: ['clean', 'tidy', 'organized', 'neat', 'hygiene'],
    smoking: ['smoke', 'smoking', 'cigarette', 'non-smoker', 'no smoking'],
    schedule: ['early', 'late', 'morning', 'night', 'schedule', 'routine'],
    music: ['music', 'loud', 'quiet', 'noise', 'sound'],
    socializing: ['social', 'party', 'friends', 'introvert', 'extrovert'],
    cooking: ['cook', 'kitchen', 'food', 'meal', 'eating'],
    study: ['study', 'quiet', 'focused', 'academic', 'student'],
    pets: ['pet', 'dog', 'cat', 'animal'],
    guests: ['guest', 'visitor', 'boyfriend', 'friends over'],
    sharing: ['share', 'sharing', 'personal space', 'privacy']
  };

  const extractPreferences = (text: string): ExtractedPreference[] => {
    const lowerText = text.toLowerCase();
    const preferences: ExtractedPreference[] = [];

    Object.entries(preferenceKeywords).forEach(([trait, keywords]) => {
      const found = keywords.some(keyword => lowerText.includes(keyword));
      if (found) {
        // Determine priority based on context
        let priority: 'high' | 'medium' | 'low' = 'medium';
        if (lowerText.includes('important') || lowerText.includes('must') || lowerText.includes('need')) {
          priority = 'high';
        } else if (lowerText.includes('prefer') || lowerText.includes('like')) {
          priority = 'medium';
        }

        preferences.push({
          trait: trait.charAt(0).toUpperCase() + trait.slice(1),
          priority,
          isNonNegotiable: lowerText.includes('must') || lowerText.includes('never')
        });
      }
    });

    return preferences;
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast.success('Voice assistant activated! Start speaking...');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + ' ' + finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast.error('Error with voice recognition. Please try again.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const analyzePreferences = () => {
    const allText = [transcript, ...additionalInputs].join(' ').trim();
    if (!allText) {
      toast.error('Please provide some input first.');
      return;
    }

    const preferences = extractPreferences(allText);
    setExtractedPreferences(preferences);
    
    if (preferences.length > 0) {
      toast.success(`Extracted ${preferences.length} preferences from your input!`);
      onPreferencesExtracted(preferences);
    } else {
      toast.error('Could not extract specific preferences. Try being more specific about your needs.');
    }
  };

  const toggleNonNegotiable = (index: number) => {
    setExtractedPreferences(prev => 
      prev.map((pref, i) => 
        i === index 
          ? { ...pref, isNonNegotiable: !pref.isNonNegotiable }
          : pref
      )
    );
  };

  const addAdditionalInput = () => {
    setAdditionalInputs(prev => [...prev, '']);
  };

  const updateAdditionalInput = (index: number, value: string) => {
    setAdditionalInputs(prev => 
      prev.map((input, i) => i === index ? value : input)
    );
  };

  const removeAdditionalInput = (index: number) => {
    if (additionalInputs.length > 1) {
      setAdditionalInputs(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Input */}
      <div className="space-y-4">
        <div className="text-center p-6 glass-card rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Tell us about your ideal roommate
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            You can speak or type freely — we'll analyze your words to understand what matters most to you.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Example: "I'd prefer someone who wakes up early, doesn't smoke, loves music, and keeps the room clean."
          </p>
        </div>

        <div className="relative">
          <Textarea
            placeholder="Start typing your preferences here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="glass-card min-h-[150px] pr-20"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              onClick={isListening ? stopListening : startListening}
              variant={isListening ? "destructive" : "outline"}
              size="sm"
              className={`${isListening ? 'pulse-mic bg-red-500' : 'glass-card'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Inputs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-primary">Additional Preferences</h4>
          <Button
            onClick={addAdditionalInput}
            variant="outline"
            size="sm"
            className="glass-card"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add More
          </Button>
        </div>

        {additionalInputs.map((input, index) => (
          <div key={index} className="relative">
            <Textarea
              placeholder={`Additional preference ${index + 1}...`}
              value={input}
              onChange={(e) => updateAdditionalInput(index, e.target.value)}
              className="glass-card min-h-[80px] pr-12"
            />
            {additionalInputs.length > 1 && (
              <Button
                onClick={() => removeAdditionalInput(index)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Analyze Button */}
      <Button
        onClick={analyzePreferences}
        className="w-full gradient-button text-lg py-3"
        disabled={isListening}
      >
        Analyze My Preferences ✨
      </Button>

      {/* Extracted Preferences */}
      {extractedPreferences.length > 0 && (
        <div className="space-y-4 p-4 glass-card rounded-lg">
          <h4 className="font-semibold text-primary">
            We've noted that you care about:
          </h4>
          <div className="flex flex-wrap gap-2">
            {extractedPreferences.map((pref, index) => (
              <Badge
                key={index}
                variant={pref.priority === 'high' ? 'default' : 'secondary'}
                className={`cursor-pointer transition-all ${
                  pref.isNonNegotiable 
                    ? 'bg-red-100 text-red-800 border-red-300' 
                    : ''
                }`}
                onClick={() => toggleNonNegotiable(index)}
              >
                {pref.trait}
                {pref.priority === 'high' && ' 🔥'}
                {pref.isNonNegotiable && ' ⚠️'}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Click on any preference to mark it as non-negotiable (⚠️)
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;