import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  userType: 'student' | 'owner';
  isVerified: boolean;
  profileImage?: string;
  documents?: string[];
  roommatePreferences?: {
    trait: string;
    priority: 'high' | 'medium' | 'low';
    isNonNegotiable?: boolean;
  }[];
  questionnaireCompleted?: boolean;
  completedAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: 'student' | 'owner') => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'isVerified'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUserPreferences: (preferences: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, userType: 'student' | 'owner'): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: 'Demo User',
        phone: '+91 9876543210',
        address: 'Mumbai, Maharashtra',
        userType,
        isVerified: true,
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
      };
      
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'isVerified'> & { password: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful signup
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        userType: userData.userType,
        isVerified: false,
        documents: userData.documents
      };
      
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserPreferences = (preferences: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...preferences };
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUserPreferences,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};