import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, MapPin, Clock, DollarSign, Star, Heart } from 'lucide-react';
import ExcursionDetails from '@/components/ExcursionDetails';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  best_season: string;
}

interface Excursion {
  id: string;
  destination_id: string;
  title: string;
  description: string;
  category: string;
  difficulty_level: string;
  duration_hours: number;
  price_usd: number;
  best_time: string;
  highlights: string[];
  what_to_bring: string[];
}

export default function TravelCompanion() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch destinations
  const { data: destinations, isLoading: destinationsLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');
      if (error) throw error;
      return data as Destination[];
    },
  });

  // Fetch excursions for selected destination
  const { data: excursions, isLoading: excursionsLoading } = useQuery({
    queryKey: ['excursions', selectedDestination?.id],
    queryFn: async () => {
      if (!selectedDestination) return [];
      const { data, error } = await supabase
        .from('excursions')
        .select('*')
        .eq('destination_id', selectedDestination.id)
        .order('title');
      if (error) throw error;
      return data as Excursion[];
    },
    enabled: !!selectedDestination,
  });

  const filteredDestinations = destinations?.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const toggleFavorite = (excursionId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(excursionId)) {
      newFavorites.delete(excursionId);
    } else {
      newFavorites.add(excursionId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ✈️ Travel Companion
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing excursions and experiences around the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Destinations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Destinations</CardTitle>
                <CardDescription>Search and explore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />

                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {destinationsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    </div>
                  ) : (
                    filteredDestinations.map((dest) => (
                      <Button
                        key={dest.id}
                        variant={selectedDestination?.id === dest.id ? 'default' : 'outline'}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => setSelectedDestination(dest)}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold">{dest.name}</span>
                          <span className="text-xs opacity-75">{dest.country}</span>
                        </div>
                      </Button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedExcursion ? (
              <ExcursionDetails
                excursion={selectedExcursion}
                onBack={() => setSelectedExcursion(null)}
                isFavorite={favorites.has(selectedExcursion.id)}
                onToggleFavorite={() => toggleFavorite(selectedExcursion.id)}
              />
            ) : selectedDestination ? (
              <div className="space-y-6">
                {/* Destination Header */}
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-3xl mb-2">
                          <MapPin className="inline w-8 h-8 mr-2 text-primary" />
                          {selectedDestination.name}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {selectedDestination.country}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{selectedDestination.best_season}</Badge>
                    </div>
                    <p className="text-foreground mt-4">{selectedDestination.description}</p>
                  </CardHeader>
                </Card>

                {/* Excursions List */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Available Excursions</h2>
                  {excursionsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : excursions && excursions.length > 0 ? (
                    <div className="grid gap-4">
                      {excursions.map((excursion) => (
                        <Card
                          key={excursion.id}
                          className="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
                          onClick={() => setSelectedExcursion(excursion)}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="mb-2">{excursion.title}</CardTitle>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant="outline">{excursion.category}</Badge>
                                  <Badge
                                    variant={
                                      excursion.difficulty_level === 'Easy'
                                        ? 'default'
                                        : excursion.difficulty_level === 'Moderate'
                                          ? 'secondary'
                                          : 'destructive'
                                    }
                                  >
                                    {excursion.difficulty_level}
                                  </Badge>
                                </div>
                              </div>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(excursion.id);
                                }}
                              >
                                <Heart
                                  className={`w-5 h-5 ${
                                    favorites.has(excursion.id)
                                      ? 'fill-red-500 text-red-500'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{excursion.description}</p>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm">{excursion.duration_hours}h</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary" />
                                <span className="text-sm">${excursion.price_usd}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-primary" />
                                <span className="text-sm">{excursion.best_time}</span>
                              </div>
                            </div>

                            {excursion.highlights && excursion.highlights.length > 0 && (
                              <div>
                                <p className="text-sm font-semibold mb-2">Highlights:</p>
                                <div className="flex flex-wrap gap-2">
                                  {excursion.highlights.map((highlight, idx) => (
                                    <Badge key={idx} variant="secondary">
                                      {highlight}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center text-muted-foreground">
                        No excursions available for this destination yet.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a destination to explore excursions</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
