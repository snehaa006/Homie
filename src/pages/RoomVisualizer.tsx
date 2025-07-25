import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Palette, Wand2, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RoomVisualizer: React.FC = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState([5000]);
  const [roomStyle, setRoomStyle] = useState('');
  const [colorPreference, setColorPreference] = useState('');

  const generateVisualization = () => {
    toast.success('Generating AI room visualization... ✨');
    setTimeout(() => {
      toast.success('Room design ready! Check out your personalized setup! 🎨');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Room Visualizer 🎨
          </h1>
        </div>

        <Card className="glass-card animate-fade-in-up mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              AI Room Setup Designer
            </CardTitle>
            <CardDescription>
              Get personalized room design ideas based on your style and budget
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Budget Range</h3>
                <span className="text-2xl font-bold text-primary">₹{budget[0].toLocaleString()}</span>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={50000}
                min={2000}
                step={1000}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room Style</Label>
                <Select value={roomStyle} onValueChange={setRoomStyle}>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Select your style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="boho">Bohemian</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color Preference</Label>
                <Select value={colorPreference} onValueChange={setColorPreference}>
                  <SelectTrigger className="glass-card">
                    <SelectValue placeholder="Choose colors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pastels">Pastel Colors</SelectItem>
                    <SelectItem value="bright">Bright & Vibrant</SelectItem>
                    <SelectItem value="neutral">Neutral Tones</SelectItem>
                    <SelectItem value="dark">Dark & Elegant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={generateVisualization} className="w-full gradient-button">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate My Room Design
            </Button>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => navigate('/')} variant="outline" className="glass-card">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomVisualizer;