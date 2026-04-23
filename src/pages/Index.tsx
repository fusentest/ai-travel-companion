import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, MapPin, Sparkles, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-block">
            <span className="text-6xl">✈️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Your AI Travel Companion
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing excursions and experiences tailored to your travel style. 
            Get personalized recommendations for every destination.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => navigate('/travel')}
          >
            Explore Destinations
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="text-4xl">🌍</div>
                <h3 className="font-semibold text-lg">8+ Destinations</h3>
                <p className="text-sm text-muted-foreground">
                  Explore popular cities around the world
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="text-4xl">🎯</div>
                <h3 className="font-semibold text-lg">Curated Excursions</h3>
                <p className="text-sm text-muted-foreground">
                  Hand-picked activities for every travel style
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="text-4xl">💡</div>
                <h3 className="font-semibold text-lg">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered suggestions based on your preferences
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="text-4xl">❤️</div>
                <h3 className="font-semibold text-lg">Save Favorites</h3>
                <p className="text-sm text-muted-foreground">
                  Keep track of your must-do experiences
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-primary/20 rounded-lg p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                1
              </div>
              <h3 className="font-semibold text-lg">Choose Destination</h3>
              <p className="text-muted-foreground">
                Browse and select from our collection of amazing travel destinations
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                2
              </div>
              <h3 className="font-semibold text-lg">Explore Excursions</h3>
              <p className="text-muted-foreground">
                Discover curated activities, tours, and experiences in each location
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                3
              </div>
              <h3 className="font-semibold text-lg">Plan & Save</h3>
              <p className="text-muted-foreground">
                Save your favorite excursions and create your perfect itinerary
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold">Ready to Start Your Adventure?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover incredible experiences and make the most of your next trip
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => navigate('/travel')}
          >
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
