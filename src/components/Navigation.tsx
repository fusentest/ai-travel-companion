import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, Map, Bookmark, LogIn } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="text-3xl">✈️</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TravelAI
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Compass className="w-4 h-4" />
                Home
              </Button>
            </Link>

            <Link to="/travel">
              <Button
                variant={isActive('/travel') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Map className="w-4 h-4" />
                Explore
              </Button>
            </Link>

            <Link to="/trips">
              <Button
                variant={isActive('/trips') ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Bookmark className="w-4 h-4" />
                My Trips
              </Button>
            </Link>

            <Link to="/signin">
              <Button
                variant={isActive('/signin') ? 'default' : 'outline'}
                className="gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
