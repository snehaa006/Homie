import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

interface LocationGroup {
  id: number;
  name: string;
  type: 'country' | 'state' | 'city';
  location: string;
  parentLocation?: string;
  members: number;
  image: string;
  description: string;
  isJoined: boolean;
}

const LocationGroups: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'country' | 'state' | 'city'>('city');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupData, setNewGroupData] = useState({
    name: '',
    type: 'city' as 'country' | 'state' | 'city',
    location: '',
    description: ''
  });

  const locationGroups: LocationGroup[] = [
    {
      id: 1,
      name: 'Bangalore Girls Community',
      type: 'city',
      location: 'Bangalore',
      parentLocation: 'Karnataka, India',
      members: 1250,
      image: 'https://images.unsplash.com/photo-1595073499011-98ef8f8a9b8c?w=150&h=150&fit=crop',
      description: 'Connect with girls living in Bangalore for PG, roommates, and city life',
      isJoined: true
    },
    {
      id: 2,
      name: 'Mumbai Living Network',
      type: 'city',
      location: 'Mumbai',
      parentLocation: 'Maharashtra, India',
      members: 890,
      image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=150&h=150&fit=crop',
      description: 'Mumbai-based girls helping each other with accommodation and city tips',
      isJoined: false
    },
    {
      id: 3,
      name: 'Karnataka State Group',
      type: 'state',
      location: 'Karnataka',
      parentLocation: 'India',
      members: 2100,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
      description: 'Girls from all over Karnataka sharing resources and experiences',
      isJoined: false
    },
    {
      id: 4,
      name: 'Delhi NCR Collective',
      type: 'city',
      location: 'Delhi NCR',
      parentLocation: 'Delhi, India',
      members: 1560,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop',
      description: 'Delhi, Gurgaon, Noida - all NCR girls united for support and friendship',
      isJoined: false
    },
    {
      id: 5,
      name: 'India Girls Network',
      type: 'country',
      location: 'India',
      members: 15000,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=150&h=150&fit=crop',
      description: 'National community for girls across all states and cities in India',
      isJoined: true
    },
    {
      id: 6,
      name: 'Hyderabad Tech Girls',
      type: 'city',
      location: 'Hyderabad',
      parentLocation: 'Telangana, India',
      members: 680,
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=150&h=150&fit=crop',
      description: 'Tech industry girls in Hyderabad sharing career and living tips',
      isJoined: false
    }
  ];

  const filteredGroups = locationGroups.filter(group => 
    group.type === selectedType &&
    (group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     group.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJoinGroup = (groupName: string) => {
    toast.success(`Joined ${groupName}! Welcome to the community! 🎉`);
  };

  const handleLeaveGroup = (groupName: string) => {
    toast.success(`Left ${groupName} group`);
  };

  const handleAddGroup = () => {
    if (!newGroupData.name || !newGroupData.location || !newGroupData.description) {
      toast.error('Please fill all fields');
      return;
    }
    
    toast.success(`Group "${newGroupData.name}" created successfully! 🎉`);
    setNewGroupData({ name: '', type: 'city', location: '', description: '' });
    setShowAddGroup(false);
  };

  const getLocationIcon = (type: 'country' | 'state' | 'city') => {
    switch (type) {
      case 'country': return '🌍';
      case 'state': return '🏛️';
      case 'city': return '🏙️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Location-Based Groups
            </CardTitle>
            <Button
              onClick={() => setShowAddGroup(!showAddGroup)}
              size="sm"
              className="gradient-button"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Group
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Type Filter */}
          <div className="flex gap-2">
            {(['country', 'state', 'city'] as const).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? "gradient-button" : "glass-card"}
              >
                {getLocationIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={`Search ${selectedType} groups...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-card"
            />
          </div>

          {/* Add Group Form */}
          {showAddGroup && (
            <Card className="feature-card border-primary/20">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold">Create New Group</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Group name"
                    value={newGroupData.name}
                    onChange={(e) => setNewGroupData(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-card"
                  />
                  <Select
                    value={newGroupData.type}
                    onValueChange={(value: 'country' | 'state' | 'city') => 
                      setNewGroupData(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger className="glass-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city">🏙️ City</SelectItem>
                      <SelectItem value="state">🏛️ State</SelectItem>
                      <SelectItem value="country">🌍 Country</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Location"
                  value={newGroupData.location}
                  onChange={(e) => setNewGroupData(prev => ({ ...prev, location: e.target.value }))}
                  className="glass-card"
                />
                <Input
                  placeholder="Group description"
                  value={newGroupData.description}
                  onChange={(e) => setNewGroupData(prev => ({ ...prev, description: e.target.value }))}
                  className="glass-card"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddGroup} size="sm" className="gradient-button">
                    Create Group
                  </Button>
                  <Button 
                    onClick={() => setShowAddGroup(false)} 
                    size="sm" 
                    variant="outline" 
                    className="glass-card"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGroups.map((group, index) => (
          <Card key={group.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <img 
                  src={group.image} 
                  alt={group.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <span className="text-lg">{getLocationIcon(group.type)}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    📍 {group.location}
                    {group.parentLocation && `, ${group.parentLocation}`}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {group.members.toLocaleString()} members
                    </Badge>
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
                          💬 Open Chat
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleLeaveGroup(group.name)}
                          className="glass-card"
                        >
                          Leave
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleJoinGroup(group.name)}
                        className="gradient-button"
                      >
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

      {filteredGroups.length === 0 && (
        <Card className="glass-card text-center p-8">
          <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">No {selectedType} groups found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Be the first to create a {selectedType} group for your location!
          </p>
          <Button 
            onClick={() => setShowAddGroup(true)}
            className="gradient-button"
          >
            Create First Group
          </Button>
        </Card>
      )}
    </div>
  );
};

export default LocationGroups;