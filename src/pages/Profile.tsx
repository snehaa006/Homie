import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import homieLogoImg from '@/assets/homie-logo.png';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      {/* Header */}
      <header className="glass-card m-4 p-4 animate-fade-in-up">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img src={homieLogoImg} alt="Homie" className="h-8 w-auto" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pb-8 space-y-6">
        {/* User Details Card */}
        <Card className="glass-card animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={user.isVerified ? "default" : "secondary"}>
                      {user.isVerified ? '✅ Verified' : '⏳ Pending'}
                    </Badge>
                    <Badge variant="outline">
                      {user.userType === 'student' ? '👩‍🎓 Student' : '🏠 PG Owner'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{user.address}</span>
                </div>
                {user.completedAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined: {new Date(user.completedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questionnaire Responses */}
        {user.roommatePreferences && user.roommatePreferences.length > 0 && (
          <Card className="glass-card animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Roommate Preferences
              </CardTitle>
              <CardDescription>
                Your saved preferences from the questionnaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preference</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.roommatePreferences.map((pref, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{pref.trait}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            pref.priority === 'high' ? 'default' : 
                            pref.priority === 'medium' ? 'secondary' : 'outline'
                          }
                        >
                          {pref.priority} {pref.priority === 'high' && '🔥'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {pref.isNonNegotiable ? (
                          <Badge variant="destructive">⚠️ Non-negotiable</Badge>
                        ) : (
                          <Badge variant="outline">Flexible</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={() => navigate('/questionnaire')} className="gradient-button">
            {user.questionnaireCompleted ? 'Update Preferences' : 'Complete Questionnaire'}
          </Button>
          <Button variant="outline" className="glass-card">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;