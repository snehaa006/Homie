import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Send, Users, Bell, Calendar, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PGCommunity: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const pgRequests = [
    {
      id: 1,
      pgName: 'Sunshine Girls PG',
      ownerName: 'Mrs. Sharma',
      location: 'Koramangala',
      message: 'Welcome to our PG community! Join our group to stay updated with events and announcements.',
      isAccepted: false
    }
  ];

  const pgGroups = [
    {
      id: 1,
      name: 'Sunshine PG - All Girls',
      type: 'girls-only',
      members: 15,
      lastMessage: 'Hey girls! Movie night this Saturday 🍿',
      lastMessageTime: '2 hours ago',
      unreadCount: 3
    },
    {
      id: 2,
      name: 'Sunshine PG - General',
      type: 'with-owner',
      members: 16,
      lastMessage: 'Monthly maintenance reminder - due by 5th',
      lastMessageTime: '1 day ago',
      unreadCount: 0
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Monthly Maintenance Due',
      message: 'Reminder: Monthly maintenance of ₹2000 is due by 5th of this month.',
      author: 'Mrs. Sharma (Owner)',
      time: '2 days ago',
      type: 'important'
    },
    {
      id: 2,
      title: 'Wi-Fi Upgrade Completed',
      message: 'High-speed internet has been installed. New password: SunshineWiFi2024',
      author: 'Mrs. Sharma (Owner)',
      time: '1 week ago',
      type: 'update'
    }
  ];

  const acceptPGRequest = (pgName: string) => {
    toast.success(`Joined ${pgName} community! Welcome! 🎉`);
  };

  const declinePGRequest = (pgName: string) => {
    toast.success(`Declined invitation to ${pgName}`);
  };

  const sendMessage = (groupName: string) => {
    if (message.trim()) {
      toast.success(`Message sent to ${groupName}!`);
      setMessage('');
    }
  };

  const joinGroup = (groupName: string) => {
    toast.success(`Joined ${groupName}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            PG Community 🏠
          </h1>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              PG Requests
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My PG Groups
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Announcements
            </TabsTrigger>
          </TabsList>

          {/* PG Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>PG Community Invitations</CardTitle>
                <CardDescription>
                  PG owners have invited you to join their community groups
                </CardDescription>
              </CardHeader>
            </Card>

            {pgRequests.length > 0 ? (
              <div className="space-y-4">
                {pgRequests.map((request, index) => (
                  <Card key={request.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <Home className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-lg">{request.pgName}</h3>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>👤 Owner: {request.ownerName}</p>
                            <p>📍 Location: {request.location}</p>
                          </div>
                          <p className="text-sm">{request.message}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button 
                            onClick={() => acceptPGRequest(request.pgName)}
                            className="gradient-button"
                            size="sm"
                          >
                            Accept
                          </Button>
                          <Button 
                            onClick={() => declinePGRequest(request.pgName)}
                            variant="outline"
                            size="sm"
                            className="glass-card"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No Pending Requests</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive invitations here when PG owners add you to their communities
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PG Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>Your PG Communities</CardTitle>
                <CardDescription>
                  Chat with your PG mates and stay updated with PG events
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {pgGroups.map((group, index) => (
                <Card key={group.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
                            {group.name.substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{group.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{group.members} members</Badge>
                              <Badge variant={group.type === 'girls-only' ? 'default' : 'secondary'}>
                                {group.type === 'girls-only' ? '👭 Girls Only' : '🏠 With Owner'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {group.unreadCount > 0 && (
                          <Badge variant="destructive" className="rounded-full">
                            {group.unreadCount}
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm">{group.lastMessage}</p>
                        <p className="text-xs text-muted-foreground">{group.lastMessageTime}</p>
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="glass-card"
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage(group.name)}
                          />
                          <Button 
                            onClick={() => sendMessage(group.name)}
                            size="icon"
                            className="gradient-button"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {pgGroups.length === 0 && (
              <Card className="glass-card">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No PG Communities Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you join a PG or get added to a PG community, your groups will appear here
                  </p>
                  <Button onClick={() => navigate('/pg-finder')} className="gradient-button">
                    Find PGs
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>PG Announcements</CardTitle>
                <CardDescription>
                  Important updates and announcements from your PG owner
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={announcement.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{announcement.title}</h3>
                        <Badge variant={announcement.type === 'important' ? 'destructive' : 'secondary'}>
                          {announcement.type === 'important' ? '🚨 Important' : '📢 Update'}
                        </Badge>
                      </div>
                      <p className="text-sm">{announcement.message}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{announcement.author}</span>
                        <span>{announcement.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button onClick={() => navigate('/')} variant="outline" className="glass-card">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PGCommunity;