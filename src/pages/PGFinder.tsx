import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Star, MapPin, Wifi, Car, Utensils, Shirt, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PGFinder: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    locality: '',
    budget: '',
    roomType: '',
    amenities: []
  });

  const mockPGs = [
    {
      id: 1,
      name: 'Sunshine Girls PG',
      rating: 4.8,
      aiRating: 9.2,
      locality: 'Koramangala',
      rent: 18000,
      roomType: '2 sharing',
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'],
      amenities: ['Wi-Fi', 'AC', 'Laundry', 'Cooking', 'Parking'],
      reviews: 45,
      description: 'Modern PG with excellent facilities and great locality connectivity',
      localityInfo: 'Tech hub area with easy metro access and safe environment'
    },
    {
      id: 2,
      name: 'Cozy Corner PG',
      rating: 4.6,
      aiRating: 8.7,
      locality: 'HSR Layout',
      rent: 15000,
      roomType: '3 sharing',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop'],
      amenities: ['Wi-Fi', 'Meals', 'Laundry', 'Security'],
      reviews: 32,
      description: 'Homely atmosphere with nutritious meals and caring staff',
      localityInfo: 'Peaceful residential area with good shopping and dining options'
    },
    {
      id: 3,
      name: 'Elite Ladies Hostel',
      rating: 4.9,
      aiRating: 9.5,
      locality: 'Indiranagar',
      rent: 22000,
      roomType: '1 sharing',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop'],
      amenities: ['Wi-Fi', 'AC', 'Gym', 'Laundry', 'Cooking', 'Swimming Pool'],
      reviews: 67,
      description: 'Premium accommodation with luxury amenities and prime location',
      localityInfo: 'Vibrant area with pubs, restaurants, and shopping centers nearby'
    }
  ];

  const handleSearch = () => {
    toast.success('Searching for PGs based on your preferences...');
  };

  const handleQuestionnaireClick = () => {
    toast.success('Opening personalized PG finder questionnaire...');
  };

  const viewPGDetails = (pgName: string) => {
    toast.success(`Opening detailed view for ${pgName}...`);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Wi-Fi': return <Wifi className="w-4 h-4" />;
      case 'Parking': return <Car className="w-4 h-4" />;
      case 'Meals': case 'Cooking': return <Utensils className="w-4 h-4" />;
      case 'Laundry': return <Shirt className="w-4 h-4" />;
      default: return <Heart className="w-4 h-4" />;
    }
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
            PG Finder 🏠
          </h1>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card animate-fade-in-up mb-6">
          <CardHeader>
            <CardTitle>Find Your Perfect PG</CardTitle>
            <CardDescription>
              Discover AI-rated PGs with detailed reviews and locality insights
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by locality, PG name, or nearby landmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-card"
              />
              <Button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8">
                Search
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={filters.locality} onValueChange={(value) => setFilters(prev => ({ ...prev, locality: value }))}>
                <SelectTrigger className="glass-card">
                  <SelectValue placeholder="Locality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="koramangala">Koramangala</SelectItem>
                  <SelectItem value="hsr">HSR Layout</SelectItem>
                  <SelectItem value="indiranagar">Indiranagar</SelectItem>
                  <SelectItem value="whitefield">Whitefield</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.budget} onValueChange={(value) => setFilters(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger className="glass-card">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-15k">₹10k - ₹15k</SelectItem>
                  <SelectItem value="15-20k">₹15k - ₹20k</SelectItem>
                  <SelectItem value="20-25k">₹20k - ₹25k</SelectItem>
                  <SelectItem value="25k+">₹25k+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.roomType} onValueChange={(value) => setFilters(prev => ({ ...prev, roomType: value }))}>
                <SelectTrigger className="glass-card">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-sharing">1 Sharing</SelectItem>
                  <SelectItem value="2-sharing">2 Sharing</SelectItem>
                  <SelectItem value="3-sharing">3 Sharing</SelectItem>
                  <SelectItem value="4-sharing">4 Sharing</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleQuestionnaireClick} variant="outline" className="glass-card">
                Smart Finder Quiz 🎯
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* PG Listings */}
        <div className="space-y-6">
          {mockPGs.map((pg, index) => (
            <Card key={pg.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <img 
                      src={pg.images[0]} 
                      alt={pg.name}
                      className="w-full h-48 lg:h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{pg.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            AI Rating: {pg.aiRating}/10
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {pg.locality}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {pg.rating} ({pg.reviews} reviews)
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{pg.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Locality Info:</p>
                        <p className="text-sm text-muted-foreground">{pg.localityInfo}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <p className="text-sm font-medium mb-2">Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {pg.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">AI Analysis:</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="flex justify-between">
                            <span>Hygiene</span>
                            <span>9.1/10</span>
                          </div>
                          <Progress value={91} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Safety</span>
                            <span>9.5/10</span>
                          </div>
                          <Progress value={95} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Locality</span>
                            <span>8.8/10</span>
                          </div>
                          <Progress value={88} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Value</span>
                            <span>9.0/10</span>
                          </div>
                          <Progress value={90} className="h-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-2xl font-bold text-primary">₹{pg.rent.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">per month</div>
                      <div className="text-sm font-medium mt-1">{pg.roomType}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => viewPGDetails(pg.name)}
                        className="w-full gradient-button"
                      >
                        View Details
                      </Button>
                      <Button variant="outline" className="w-full glass-card">
                        Contact Owner
                      </Button>
                      <Button variant="ghost" className="w-full text-primary">
                        Schedule Visit
                      </Button>
                    </div>
                  </div>
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
};

export default PGFinder;