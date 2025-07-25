import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Mic, Heart, Star, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RoomMatching: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    budget: [15000],
    extroversion: [3],
    cleanliness: [4],
    studyHours: [6],
    socializing: [3],
    musicTolerance: [3]
  });
  const [additionalPreferences, setAdditionalPreferences] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showMatches, setShowMatches] = useState(false);

  const mockMatches = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 22,
      profession: 'Software Engineer',
      compatibility: 92,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      location: 'Koramangala, Bangalore',
      interests: ['Reading', 'Coding', 'Yoga'],
      budget: 16000
    },
    {
      id: 2,
      name: 'Ananya Patel',
      age: 21,
      profession: 'Marketing Executive',
      compatibility: 87,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'HSR Layout, Bangalore',
      interests: ['Travel', 'Photography', 'Dancing'],
      budget: 14500
    },
    {
      id: 3,
      name: 'Sneha Reddy',
      age: 23,
      profession: 'Graphic Designer',
      compatibility: 85,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      location: 'Indiranagar, Bangalore',
      interests: ['Art', 'Music', 'Fitness'],
      budget: 15500
    }
  ];

  const handleSliderChange = (key: string, value: number[]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const startVoiceInput = () => {
    setIsListening(true);
    toast.success('Voice assistant activated! Start speaking...');
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      setAdditionalPreferences('I prefer someone who is clean, studies in the evening, and enjoys cooking together.');
      toast.success('Voice input captured successfully!');
    }, 3000);
  };

  const findMatches = () => {
    toast.success('Finding your perfect matches...');
    setTimeout(() => {
      setShowMatches(true);
      toast.success('Found amazing matches for you! 🎉');
    }, 2000);
  };

  const contactMatch = (name: string) => {
    toast.success(`Connecting you with ${name}...`);
  };

  const viewProfile = (name: string) => {
    toast.success(`Opening ${name}'s profile...`);
  };

  if (showMatches) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowMatches(false)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Perfect Matches ✨
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMatches.map((match, index) => (
              <Card key={match.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center pb-3">
                  <div className="relative mx-auto mb-4">
                    <img 
                      src={match.image} 
                      alt={match.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      {match.compatibility}% Match
                    </div>
                  </div>
                  <CardTitle className="text-xl">{match.name}</CardTitle>
                  <CardDescription>{match.age} years • {match.profession}</CardDescription>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(match.compatibility / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">📍 {match.location}</p>
                    <p className="text-sm text-muted-foreground mb-2">💰 Budget: ₹{match.budget.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {match.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Compatibility Score:</p>
                    <Progress value={match.compatibility} className="h-2" />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => viewProfile(match.name)}
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Profile
                    </Button>
                    <Button 
                      onClick={() => contactMatch(match.name)}
                      className="flex-1 gradient-button"
                      size="sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button onClick={() => navigate('/')} variant="outline" className="glass-card">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Room Matching 💕
          </h1>
        </div>

        <Card className="glass-card animate-fade-in-up mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Find Your Perfect Roommate
            </CardTitle>
            <CardDescription>
              Tell us about your preferences and we'll find the most compatible roommates for you!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Budget Preference */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Monthly Budget</h3>
                <span className="text-2xl font-bold text-primary">₹{preferences.budget[0].toLocaleString()}</span>
              </div>
              <Slider
                value={preferences.budget}
                onValueChange={(value) => handleSliderChange('budget', value)}
                max={50000}
                min={5000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹5,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Personality Traits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'extroversion', label: 'Extroversion Level', desc: 'How social are you?', emoji: '🗣️' },
                { key: 'cleanliness', label: 'Cleanliness', desc: 'How important is cleanliness?', emoji: '🧹' },
                { key: 'studyHours', label: 'Study Hours/Day', desc: 'Hours you study daily', emoji: '📚' },
                { key: 'socializing', label: 'Socializing', desc: 'How much do you socialize?', emoji: '👥' },
                { key: 'musicTolerance', label: 'Music Tolerance', desc: 'Tolerance for music/noise', emoji: '🎵' }
              ].map((trait) => (
                <div key={trait.key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <span>{trait.emoji}</span>
                        {trait.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{trait.desc}</p>
                    </div>
                    <span className="text-xl font-bold text-secondary">
                      {preferences[trait.key as keyof typeof preferences][0]}/5
                    </span>
                  </div>
                  <Slider
                    value={preferences[trait.key as keyof typeof preferences]}
                    onValueChange={(value) => handleSliderChange(trait.key, value)}
                    max={5}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            {/* Additional Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Preferences</h3>
              <div className="relative">
                <Textarea
                  placeholder="Tell us more about your preferences... (cooking habits, sleep schedule, hobbies, etc.)"
                  value={additionalPreferences}
                  onChange={(e) => setAdditionalPreferences(e.target.value)}
                  className="glass-card min-h-[120px]"
                />
                <Button
                  onClick={startVoiceInput}
                  variant="ghost"
                  size="sm"
                  className={`absolute top-2 right-2 ${isListening ? 'animate-pulse text-red-500' : ''}`}
                  disabled={isListening}
                >
                  <Mic className="w-4 h-4" />
                  {isListening ? 'Listening...' : 'Voice Input'}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button onClick={findMatches} className="flex-1 gradient-button">
                Find My Perfect Matches ✨
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="glass-card">
                Save for Later
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoomMatching;