import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, MapPin, Clock, DollarSign, Backpack, AlertCircle } from 'lucide-react';

interface Excursion {
  id: string;
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

interface ExcursionDetailsProps {
  excursion: Excursion;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ExcursionDetails({
  excursion,
  onBack,
  isFavorite,
  onToggleFavorite,
}: ExcursionDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-3xl font-bold flex-1">{excursion.title}</h2>
        <Button
          size="icon"
          variant="ghost"
          onClick={onToggleFavorite}
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </Button>
      </div>

      {/* Main details card */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="text-base py-1 px-3">
              {excursion.category}
            </Badge>
            <Badge
              variant={
                excursion.difficulty_level === 'Easy'
                  ? 'default'
                  : excursion.difficulty_level === 'Moderate'
                    ? 'secondary'
                    : 'destructive'
              }
              className="text-base py-1 px-3"
            >
              {excursion.difficulty_level}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{excursion.description}</p>
        </CardHeader>
      </Card>

      {/* Quick info grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{excursion.duration_hours} hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-semibold">${excursion.price_usd}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Best Time</p>
                <p className="font-semibold text-sm">{excursion.best_time}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-semibold text-sm">{excursion.difficulty_level}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights */}
      {excursion.highlights && excursion.highlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {excursion.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* What to bring */}
      {excursion.what_to_bring && excursion.what_to_bring.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Backpack className="w-5 h-5" />
              What to Bring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {excursion.what_to_bring.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-secondary/50 p-3 rounded-lg">
                  <span className="text-primary">📦</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action buttons */}
      <div className="flex gap-4">
        <Button size="lg" className="flex-1">
          Book Now
        </Button>
        <Button size="lg" variant="outline" className="flex-1">
          Share
        </Button>
      </div>
    </div>
  );
}
