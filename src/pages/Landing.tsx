import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Home, MessageCircle, Shield, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import homieLogoImg from '@/assets/homie-logo.png';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Smart Roommate Matching',
      description: 'AI-powered compatibility matching based on lifestyle, habits, and preferences'
    },
    {
      icon: Home,
      title: 'Verified PG Listings',
      description: 'Find rated PGs with detailed reviews and authentic photos'
    },
    {
      icon: MessageCircle,
      title: 'Safe Community',
      description: 'Connect with verified girls in secure, moderated communities'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your data is secure with end-to-end encryption and privacy controls'
    }
  ];

  const testimonials = [
    {
      name: 'Priya S.',
      text: 'Found my perfect roommate in just 2 days! The compatibility matching really works.',
      rating: 5
    },
    {
      name: 'Ananya M.',
      text: 'Best platform for finding safe PGs. The reviews were so helpful.',
      rating: 5
    },
    {
      name: 'Sneha R.',
      text: 'Love the community features. Made so many friends through Homie!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5">
      {/* Header */}
      <header className="glass-card m-4 p-4 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={homieLogoImg} alt="Homie" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HOMIE
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/auth')} className="text-primary">
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')} className="gradient-button">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Find Your Perfect
            <br />
            Roommate & PG
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The safest platform for girls to find compatible roommates, 
            verified PGs, and build lasting friendships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="gradient-button text-lg px-8 py-4"
              onClick={() => navigate('/auth')}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 glass-card"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Why Choose Homie?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.title}
                  className="feature-card animate-fade-in-up text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
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
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="glass-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-primary">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card animate-fade-in-up">
            <CardContent className="p-12">
              <Heart className="w-16 h-16 text-primary mx-auto mb-6" fill="currentColor" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ready to Find Your Homie?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of girls who've found their perfect roommates and dream PGs.
              </p>
              <Button 
                size="lg" 
                className="gradient-button text-lg px-8 py-4"
                onClick={() => navigate('/auth')}
              >
                Join Homie Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-card m-4 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={homieLogoImg} alt="Homie" className="h-8 w-auto" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            HOMIE
          </span>
        </div>
        <p className="text-muted-foreground">
          Making roommate finding safe, smart, and simple for girls everywhere.
        </p>
      </footer>
    </div>
  );
};

export default Landing;