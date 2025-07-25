import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Plus, MessageCircle, Heart, ShoppingBag, Upload, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const marketplaceItems = [
    {
      id: 1,
      title: 'Beautiful Ethnic Kurti Set',
      price: 800,
      originalPrice: 1500,
      condition: 'Like New',
      size: 'M',
      seller: 'Priya Sharma',
      sellerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
      location: 'Koramangala',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop'],
      category: 'Ethnic Wear',
      description: 'Beautiful blue kurti with palazzo pants. Worn only twice for festivals.',
      posted: '2 days ago',
      rating: 4.8,
      negotiable: true
    },
    {
      id: 2,
      title: 'Western Dress Collection',
      price: 1200,
      originalPrice: 2500,
      condition: 'Good',
      size: 'S',
      seller: 'Ananya Patel',
      sellerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      location: 'HSR Layout',
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop'],
      category: 'Western Wear',
      description: 'Set of 3 party dresses. Perfect for college events and parties.',
      posted: '1 week ago',
      rating: 4.9,
      negotiable: true
    },
    {
      id: 3,
      title: 'Study Table Lamp',
      price: 300,
      originalPrice: 600,
      condition: 'Good',
      size: '-',
      seller: 'Sneha Reddy',
      sellerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      location: 'Indiranagar',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'],
      category: 'Study Items',
      description: 'LED study table lamp with adjustable brightness. Moving out sale.',
      posted: '3 days ago',
      rating: 4.7,
      negotiable: false
    }
  ];

  const categories = [
    'Ethnic Wear',
    'Western Wear',
    'Accessories',
    'Study Items',
    'Electronics',
    'Shoes',
    'Bags',
    'Books',
    'Other'
  ];

  const contactSeller = (sellerName: string, itemTitle: string) => {
    toast.success(`Opening chat with ${sellerName} about "${itemTitle}"...`);
  };

  const likeItem = (itemTitle: string) => {
    toast.success(`Added "${itemTitle}" to your wishlist! ❤️`);
  };

  const startBargaining = (itemTitle: string, sellerName: string) => {
    toast.success(`Starting price negotiation with ${sellerName} for "${itemTitle}"...`);
  };

  const handleSellItem = () => {
    toast.success('Opening sell item form...');
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
            Buy & Sell 🛍️
          </h1>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Browse Items
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Sell Item
            </TabsTrigger>
          </TabsList>

          {/* Browse Items Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>Find Amazing Deals</CardTitle>
                <CardDescription>
                  Browse clothes and products from girls in your community
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search for clothes, accessories, books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-card"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="glass-card">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="glass-card">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">Under ₹500</SelectItem>
                      <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
                      <SelectItem value="1000-2000">₹1000 - ₹2000</SelectItem>
                      <SelectItem value="2000+">Above ₹2000</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="glass-card">
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Brand New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceItems.map((item, index) => (
                <Card key={item.id} className="feature-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        onClick={() => likeItem(item.title)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Badge className="absolute top-2 left-2 bg-green-100 text-green-800">
                        {item.condition}
                      </Badge>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">₹{item.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                        {item.negotiable && (
                          <Badge variant="outline" className="text-xs">Negotiable</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <img 
                          src={item.sellerImage} 
                          alt={item.seller}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="font-medium">{item.seller}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        📍 {item.location} • {item.posted}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          onClick={() => contactSeller(item.seller, item.title)}
                          className="flex-1 gradient-button"
                          size="sm"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                        {item.negotiable && (
                          <Button 
                            onClick={() => startBargaining(item.title, item.seller)}
                            variant="outline"
                            size="sm"
                            className="glass-card"
                          >
                            Bargain
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sell Item Tab */}
          <TabsContent value="sell" className="space-y-6">
            <Card className="glass-card animate-fade-in-up">
              <CardHeader>
                <CardTitle>Sell Your Item</CardTitle>
                <CardDescription>
                  List your clothes and products for other girls to discover
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Item Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Beautiful Blue Kurti"
                      className="glass-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Selling Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="₹500"
                      className="glass-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="original-price">Original Price</Label>
                    <Input
                      id="original-price"
                      type="number"
                      placeholder="₹1000"
                      className="glass-card"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select>
                      <SelectTrigger className="glass-card">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Brand New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item, its condition, size, and why you're selling it..."
                    className="glass-card min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images *</Label>
                  <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center glass-card">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop images
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Up to 5 images, JPG or PNG, max 5MB each
                    </p>
                    <Button variant="outline" className="mt-4 glass-card">
                      Choose Images
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSellItem} className="w-full gradient-button">
                  List Item for Sale
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

export default Marketplace;