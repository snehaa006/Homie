import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CalendarIcon, Clock, MapPin, Users, Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  organizer: string;
  organizerAvatar: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
  isAttending: boolean;
  isOrganizer: boolean;
  image: string;
  price?: number;
}

const EventManager: React.FC = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    maxAttendees: '',
    price: ''
  });

  const events: Event[] = [
    {
      id: 1,
      title: 'Book Club Meetup - "The Seven Husbands of Evelyn Hugo"',
      description: 'Join us for an engaging discussion about this month\'s book pick. We\'ll share our thoughts, favorite quotes, and enjoy some tea and snacks!',
      date: new Date(2024, 1, 15),
      time: '7:00 PM',
      location: 'Central Library, Koramangala',
      organizer: 'Priya Sharma',
      organizerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
      category: 'Literature',
      attendees: 12,
      maxAttendees: 20,
      isAttending: true,
      isOrganizer: false,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Morning Yoga & Meditation Session',
      description: 'Start your day with peaceful yoga and meditation in the beautiful surroundings of Cubbon Park. Suitable for all levels!',
      date: new Date(2024, 1, 12),
      time: '6:30 AM',
      location: 'Cubbon Park, Main Entrance',
      organizer: 'Sneha Reddy',
      organizerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      category: 'Fitness',
      attendees: 25,
      maxAttendees: 30,
      isAttending: false,
      isOrganizer: false,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Cooking Workshop - South Indian Breakfast',
      description: 'Learn to make authentic dosas, idlis, and chutneys from scratch! All ingredients and equipment provided.',
      date: new Date(2024, 1, 18),
      time: '4:00 PM',
      location: 'Community Kitchen, HSR Layout',
      organizer: 'Ananya Patel',
      organizerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      category: 'Cooking',
      attendees: 18,
      maxAttendees: 25,
      isAttending: true,
      isOrganizer: true,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
      price: 500
    },
    {
      id: 4,
      title: 'Tech Meetup - Women in AI & Machine Learning',
      description: 'Network with fellow women in tech, share experiences, and learn about the latest trends in AI and ML.',
      date: new Date(2024, 1, 20),
      time: '6:00 PM',
      location: 'WeWork, Prestige Atlanta, Koramangala',
      organizer: 'Kavya Nair',
      organizerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      category: 'Technology',
      attendees: 45,
      maxAttendees: 60,
      isAttending: false,
      isOrganizer: false,
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&h=200&fit=crop'
    }
  ];

  const categories = [
    'Literature', 'Fitness', 'Cooking', 'Technology', 'Art & Craft',
    'Music', 'Dance', 'Photography', 'Travel', 'Career', 'Networking', 'Other'
  ];

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.location) {
      toast.error('Please fill all required fields');
      return;
    }

    toast.success(`Event "${newEvent.title}" created successfully! 🎉`);
    setNewEvent({
      title: '', description: '', date: '', time: '', location: '',
      category: '', maxAttendees: '', price: ''
    });
    setShowAddEvent(false);
  };

  const handleJoinEvent = (eventTitle: string) => {
    toast.success(`Registered for "${eventTitle}"! 🎉`);
  };

  const handleLeaveEvent = (eventTitle: string) => {
    toast.success(`Left event "${eventTitle}"`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Literature': return '📚';
      case 'Fitness': return '💪';
      case 'Cooking': return '👩‍🍳';
      case 'Technology': return '💻';
      case 'Art & Craft': return '🎨';
      case 'Music': return '🎵';
      case 'Dance': return '💃';
      case 'Photography': return '📸';
      case 'Travel': return '✈️';
      case 'Career': return '💼';
      case 'Networking': return '🤝';
      default: return '🎯';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Community Events
            </CardTitle>
            <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
              <DialogTrigger asChild>
                <Button className="gradient-button">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Organize an event for the community
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Morning Yoga Session"
                      className="glass-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your event, what participants should expect..."
                      className="glass-card"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        className="glass-card"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        className="glass-card"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., Cubbon Park, Central Library"
                      className="glass-card"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value) => setNewEvent(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="glass-card">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {getCategoryIcon(cat)} {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxAttendees">Max Attendees</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        value={newEvent.maxAttendees}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, maxAttendees: e.target.value }))}
                        placeholder="Leave empty for unlimited"
                        className="glass-card"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Entry Fee (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newEvent.price}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="Leave empty for free event"
                      className="glass-card"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleAddEvent} className="gradient-button flex-1">
                      Create Event
                    </Button>
                    <Button 
                      onClick={() => setShowAddEvent(false)} 
                      variant="outline" 
                      className="glass-card"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <Card key={event.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="relative">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              {event.isOrganizer && (
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Organizer
                </Badge>
              )}
              {event.price && (
                <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                  ₹{event.price}
                </Badge>
              )}
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                  <span className="text-lg">{getCategoryIcon(event.category)}</span>
                </div>
                <Badge variant="secondary" className="text-xs">{event.category}</Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <img 
                  src={event.organizerAvatar} 
                  alt={event.organizer}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium">{event.organizer}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    {event.attendees}{event.maxAttendees ? `/${event.maxAttendees}` : ''} attending
                  </span>
                </div>
                
                {event.isAttending ? (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Registered ✓
                  </Badge>
                ) : null}
              </div>

              <div className="flex gap-2 pt-2">
                {event.isOrganizer ? (
                  <Button size="sm" variant="outline" className="flex-1 glass-card">
                    Manage Event
                  </Button>
                ) : event.isAttending ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleLeaveEvent(event.title)}
                    className="flex-1 glass-card"
                  >
                    Leave Event
                  </Button>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => handleJoinEvent(event.title)}
                    className="flex-1 gradient-button"
                    disabled={event.maxAttendees ? event.attendees >= event.maxAttendees : false}
                  >
                    {event.maxAttendees && event.attendees >= event.maxAttendees ? 'Full' : 'Join Event'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManager;