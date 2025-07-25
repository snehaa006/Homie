import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, Users, Calendar, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const interestGroups = [
    {
      id: 1,
      name: 'Bookworms 📚',
      description: 'For girls who love reading and discussing books',
      members: 45,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop',
      isJoined: false
    },
    {
      id: 2,
      name: 'Fitness Gurus 💪',
      description: 'Workout buddies and fitness motivation',
      members: 67,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
      isJoined: true
    },
    {
      id: 3,
      name: 'Startup Roomies 🚀',
      description: 'Entrepreneurial minds sharing ideas and experiences',
      members: 32,
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=150&h=150&fit=crop',
      isJoined: false
    },
    {
      id: 4,
      name: 'Cooking Queens 👑',
      description: 'Share recipes, cooking tips, and foodie adventures',
      members: 89,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop',
      isJoined: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Book Club Meetup',
      date: '2024-02-15',
      time: '7:00 PM',
      location: 'Central Library, Koramangala',
      group: 'Bookworms',
      attendees: 12
    },
    {
      id: 2,
      title: 'Morning Yoga Session',
      date: '2024-02-12',
      time: '6:30 AM',
      location: 'Cubbon Park',
      group: 'Fitness Gurus',
      attendees: 25
    },
    {
      id: 3,
      title: 'Cooking Workshop',
      date: '2024-02-18',
      time: '4:00 PM',
      location: 'Community Kitchen, HSR',
      group: 'Cooking Queens',
      attendees: 18
    }
  ];

  const friendRequests = [
    {
      id: 1,
      name: 'Priya Sharma',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
      mutualFriends: 3,
      location: 'Koramangala'
    },
    {
      id: 2,
      name: 'Ananya Patel',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      mutualFriends: 1,
      location: 'HSR Layout'
    }
  ];

  const joinGroup = (groupName: string) => {
    toast.success(`Joined ${groupName}! Welcome to the community! 🎉`);
  };

  const leaveGroup = (groupName: string) => {
    toast.success(`Left ${groupName} group`);
  };

  const sendFriendRequest = (name: string) => {
    toast.success(`Friend request sent to ${name}!`);
  };

  const acceptFriendRequest = (name: string) => {
    toast.success(`You and ${name} are now friends! 💕`);
  };

  const joinEvent = (eventTitle: string) => {
    toast.success(`Registered for ${eventTitle}!`);
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
            Main Community 👭
          </h1>
        </div>

        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Interest Groups
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Friends
            </TabsTrigger>
          </TabsList>

          {/* Interest Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>Join Interest-Based Groups</CardTitle>
                <CardDescription>
                  Connect with girls who share your interests and hobbies
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search groups by interest..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-card"
                  />
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interestGroups.map((group, index) => (
                <Card key={group.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{group.members} members</Badge>
                          {group.isJoined && (
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Joined ✓
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2 pt-2">
                          {group.isJoined ? (
                            <>
                              <Button size="sm" className="gradient-button">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Chat
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => leaveGroup(group.name)}
                                className="glass-card"
                              >
                                Leave
                              </Button>
                            </>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => joinGroup(group.name)}
                              className="gradient-button"
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Join Group
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Join events organized by various interest groups
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card key={event.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>📅 {event.date} at {event.time}</p>
                          <p>📍 {event.location}</p>
                          <p>👥 {event.attendees} attending</p>
                        </div>
                        <Badge variant="secondary">{event.group}</Badge>
                      </div>
                      <Button 
                        onClick={() => joinEvent(event.title)}
                        className="gradient-button"
                      >
                        Join Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>Friend Requests</CardTitle>
                <CardDescription>
                  Connect with amazing girls and build lasting friendships
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {friendRequests.map((request, index) => (
                <Card key={request.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={request.image} 
                          alt={request.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">📍 {request.location}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.mutualFriends} mutual friends
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => acceptFriendRequest(request.name)}
                          className="gradient-button"
                        >
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="glass-card">
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-card">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Discover New Friends</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find girls with similar interests and send friend requests
                </p>
                <Button className="gradient-button">
                  Explore Profiles
                </Button>
              </CardContent>
            </Card>
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

export default Community;