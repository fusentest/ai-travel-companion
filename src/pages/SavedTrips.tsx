import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Trash2, Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SavedTrip {
  id: string;
  trip_name: string;
  destination_name: string;
  start_date: string | null;
  end_date: string | null;
  excursion_count: number;
}

export default function SavedTrips() {
  const { toast } = useToast();
  const [newTripName, setNewTripName] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Fetch user's saved trips
  const { data: trips, isLoading, refetch } = useQuery({
    queryKey: ['savedTrips'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_trips')
        .select(`
          id,
          trip_name,
          start_date,
          end_date,
          destinations (name),
          trip_excursions (id)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data || []).map((trip: any) => ({
        id: trip.id,
        trip_name: trip.trip_name,
        destination_name: trip.destinations?.name || 'Unknown',
        start_date: trip.start_date,
        end_date: trip.end_date,
        excursion_count: trip.trip_excursions?.length || 0,
      }));
    },
  });

  // Fetch destinations for dropdown
  const { data: destinations } = useQuery({
    queryKey: ['destinationsForTrips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name')
        .order('name');
      if (error) throw error;
      return data;
    },
  });

  const handleCreateTrip = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'Error',
          description: 'You must be logged in to create a trip',
          variant: 'destructive',
        });
        return;
      }

      if (!newTripName || !selectedDestination) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields',
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase.from('user_trips').insert({
        user_id: user.id,
        destination_id: selectedDestination,
        trip_name: newTripName,
        start_date: startDate || null,
        end_date: endDate || null,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Trip created successfully!',
      });

      setNewTripName('');
      setSelectedDestination('');
      setStartDate('');
      setEndDate('');
      setIsOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create trip',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase.from('user_trips').delete().eq('id', tripId);
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Trip deleted successfully',
      });
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete trip',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">📋 My Trips</h1>
            <p className="text-muted-foreground">Manage and organize your travel plans</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-4 h-4" />
                New Trip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Trip</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trip-name">Trip Name</Label>
                  <Input
                    id="trip-name"
                    placeholder="e.g., Summer Vacation 2024"
                    value={newTripName}
                    onChange={(e) => setNewTripName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <select
                    id="destination"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                  >
                    <option value="">Select a destination...</option>
                    {destinations?.map((dest: any) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleCreateTrip} className="w-full">
                  Create Trip
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Trips Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : trips && trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{trip.trip_name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-2">
                        <MapPin className="w-4 h-4" />
                        {trip.destination_name}
                      </CardDescription>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteTrip(trip.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {trip.start_date && trip.end_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(trip.start_date).toLocaleDateString()} -{' '}
                      {new Date(trip.end_date).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {trip.excursion_count} excursions saved
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No trips yet. Create your first trip!</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>Create Trip</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Trip</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="trip-name">Trip Name</Label>
                      <Input
                        id="trip-name"
                        placeholder="e.g., Summer Vacation 2024"
                        value={newTripName}
                        onChange={(e) => setNewTripName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <select
                        id="destination"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={selectedDestination}
                        onChange={(e) => setSelectedDestination(e.target.value)}
                      >
                        <option value="">Select a destination...</option>
                        {destinations?.map((dest: any) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button onClick={handleCreateTrip} className="w-full">
                      Create Trip
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
