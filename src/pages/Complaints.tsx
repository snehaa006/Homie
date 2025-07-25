import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, AlertTriangle, Send, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Complaints: React.FC = () => {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState('');
  const [category, setCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const complaintCategories = [
    'Food Quality',
    'Cleanliness',
    'Laundry Service',
    'Wi-Fi Issues',
    'Maintenance',
    'Safety Concerns',
    'Noise Issues',
    'Other'
  ];

  const myComplaints = [
    {
      id: 1,
      category: 'Food Quality',
      message: 'The dinner quality has been poor lately. Please improve the taste and variety.',
      status: 'Resolved',
      response: 'Thank you for the feedback. We have changed our cook and improved the menu.',
      date: '2024-02-05',
      isAnonymous: true
    },
    {
      id: 2,
      category: 'Laundry Service',
      message: 'Laundry is taking too long to dry. Can we get better drying arrangements?',
      status: 'In Progress',
      response: 'We are installing additional drying racks this week.',
      date: '2024-02-08',
      isAnonymous: false
    }
  ];

  const submitComplaint = () => {
    if (!complaint.trim() || !category) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success(
      isAnonymous 
        ? 'Anonymous complaint submitted successfully! 📝' 
        : 'Complaint submitted successfully! 📝'
    );
    
    setComplaint('');
    setCategory('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            Complaints Section 📝
          </h1>
        </div>

        {/* Submit New Complaint */}
        <Card className="glass-card animate-fade-in-up mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Submit a Complaint
            </CardTitle>
            <CardDescription>
              Share your concerns with your PG owner. Your feedback helps improve the living experience.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-4 glass-card rounded-lg">
              <div className="flex items-center gap-3">
                {isAnonymous ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="anonymous" className="font-medium">
                    Anonymous Complaint
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {isAnonymous 
                      ? 'Your identity will be hidden from the PG owner' 
                      : 'Your name will be visible to the PG owner'
                    }
                  </p>
                </div>
              </div>
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Complaint Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="glass-card">
                  <SelectValue placeholder="Select complaint category" />
                </SelectTrigger>
                <SelectContent>
                  {complaintCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Complaint Message */}
            <div className="space-y-2">
              <Label htmlFor="complaint">Describe Your Concern</Label>
              <Textarea
                id="complaint"
                placeholder="Please describe your complaint in detail. Be specific about the issue and suggest improvements if possible..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="glass-card min-h-[120px]"
                maxLength={500}
              />
              <div className="text-sm text-muted-foreground text-right">
                {complaint.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={submitComplaint}
              className="w-full gradient-button"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Complaint
            </Button>
          </CardContent>
        </Card>

        {/* My Previous Complaints */}
        <Card className="glass-card animate-fade-in-up">
          <CardHeader>
            <CardTitle>My Previous Complaints</CardTitle>
            <CardDescription>
              Track the status and responses to your submitted complaints
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {myComplaints.length > 0 ? (
              <div className="space-y-4">
                {myComplaints.map((item, index) => (
                  <Card key={item.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{item.category}</Badge>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            {item.isAnonymous && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <EyeOff className="w-3 h-3" />
                                Anonymous
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Your Complaint:</p>
                          <p className="text-sm text-muted-foreground">{item.message}</p>
                        </div>
                        
                        {item.response && (
                          <div className="space-y-2 p-4 glass-card rounded-lg">
                            <p className="text-sm font-medium text-primary">PG Owner Response:</p>
                            <p className="text-sm">{item.response}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No Complaints Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Your submitted complaints will appear here with their status and responses
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="glass-card animate-fade-in-up mt-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Complaint Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific and constructive in your feedback</li>
                  <li>• Anonymous complaints help maintain privacy</li>
                  <li>• PG owners typically respond within 24-48 hours</li>
                  <li>• For urgent issues, contact PG management directly</li>
                  <li>• All complaints are confidential and help improve PG services</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button onClick={() => navigate('/')} variant="outline" className="glass-card">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Complaints;