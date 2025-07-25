import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Heart, Home } from 'lucide-react';
import homieLogoImg from '@/assets/homie-logo.png';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'owner'>('student');
  const { login, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(email, password, userType);
    if (success) {
      toast.success(`Welcome back! Logged in as ${userType}`);
    } else {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
      <div className="absolute inset-0 opacity-20"></div>
      
      <Card className="w-full max-w-md glass-card animate-bounce-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img src={homieLogoImg} alt="Homie" className="h-16 w-auto" />
              <Heart className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" fill="currentColor" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Homie
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your perfect roommate is just a click away! 💕
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'owner')} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 glass-card">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Student
              </TabsTrigger>
              <TabsTrigger value="owner" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                PG Owner
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="mt-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Looking for your perfect roommate? Let's find your homie! 🏠
              </p>
            </TabsContent>
            
            <TabsContent value="owner" className="mt-4">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Ready to welcome amazing girls to your PG? Let's connect! 🌟
              </p>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-card border-white/30"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-card border-white/30 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-primary hover:text-primary-light font-medium hover:underline transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};