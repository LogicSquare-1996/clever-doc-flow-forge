
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import { User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export const Header = ({ isAuthenticated, onAuthClick }: HeaderProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            DocuGen
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isAuthenticated && <NotificationDropdown />}
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleProfileClick}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={onAuthClick}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
