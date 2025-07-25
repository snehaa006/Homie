import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { 
  Users, 
  Home, 
  MessageCircle, 
  MessageSquare, 
  AlertTriangle, 
  ShoppingBag, 
  Palette, 
  Calculator,
  LogOut,
  Bell,
  Settings,
  Heart,
  Star,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import homieLogoImg from '@/assets/homie-logo.png';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  const handleFeatureClick = (featureName: string, route: string) => {
    toast.success(`Opening ${featureName}...`);
    navigate(route);
  };

  const studentFeatures = [
    {
      title: 'Room Matching',
      description: 'Find your perfect roommate with AI-powered compatibility matching',
      icon: Users,
      route: '/room-matching',
      color: 'from-pink-500 to-purple-500'
    },
    {
      title: 'PG Finder',
      description: 'Discover rated PGs with detailed reviews and locality insights',
      icon: Home,
      route: '/pg-finder',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Main Community',
      description: 'Connect with girls from all PGs and join interest-based groups',
      icon: MessageCircle,
      route: '/community',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'PG Community',
      description: 'Chat with your PG mates and stay updated with PG events',
      icon: MessageSquare,
      route: '/pg-community',
      color: 'from-blue-500 to-teal-500'
    },
    {
      title: 'Complaints',
      description: 'Submit anonymous complaints to your PG owner',
      icon: AlertTriangle,
      route: '/complaints',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Buy & Sell',
      description: 'Trade clothes and products with other girls safely',
      icon: ShoppingBag,
      route: '/marketplace',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Room Visualizer',
      description: 'Get AI-generated room setup ideas within your budget',
      icon: Palette,
      route: '/room-visualizer',
      color: 'from-violet-500 to-purple-500'
    },
    {
      title: 'Splitwise',
      description: 'Manage shared expenses with your roommates easily',
      icon: Calculator,
      route: '/splitwise',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const ownerFeatures = [
    {
      title: 'PG Management',
      description: 'List and manage your PG properties with photo ratings',
      icon: Home,
      route: '/pg-management',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'PG Community',
      description: 'Communicate with your PG residents and manage groups',
      icon: MessageSquare,
      route: '/pg-community',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Complaints Dashboard',
      description: 'Review and respond to resident complaints',
      icon: AlertTriangle,
      route: '/complaints-dashboard',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Analytics',
      description: 'View ratings, reviews, and PG performance metrics',
      icon: Star,
      route: '/analytics',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const features = user?.userType === 'student' ? studentFeatures : ownerFeatures;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      {/* Header */}
      <header className="glass-card m-4 p-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={homieLogoImg} alt="Homie" className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                {user?.userType === 'student' ? 'Find your perfect roommate today!' : 'Manage your PG properties'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full"
              onClick={() => navigate('/profile')}
            >
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* User Info Card */}
      <div className="mx-4 mb-6">
        <Card className="glass-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <Heart className="w-8 h-8 text-white" fill="currentColor" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{user?.name}</h3>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-sm text-muted-foreground">{user?.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user?.isVerified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.isVerified ? '✅ Verified' : '⏳ Pending Verification'}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {user?.userType === 'student' ? '👩‍🎓 Student' : '🏠 PG Owner'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="mx-4 pb-8">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {user?.userType === 'student' ? 'Discover Amazing Features' : 'Manage Your PG Business'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.title}
                className="feature-card animate-fade-in-up cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleFeatureClick(feature.title, feature.route)}
              >
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats for Students */}
      {user?.userType === 'student' && (
        <div className="mx-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="glass-card text-center animate-fade-in-up">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Active Girls</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center animate-fade-in-up">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-muted-foreground">Quality PGs</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center animate-fade-in-up">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;