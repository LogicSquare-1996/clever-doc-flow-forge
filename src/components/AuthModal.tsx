
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Lock, User, Github } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal = ({ onClose, onSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    // Mock authentication - replace with real auth
    console.log(`${type}:`, { email, password, name });
    onSuccess();
  };

  const handleGoogleAuth = () => {
    // Mock Google auth - replace with real implementation
    console.log('Google auth');
    onSuccess();
  };

  const handleGithubAuth = () => {
    // Mock GitHub auth - replace with real implementation
    console.log('GitHub auth');
    onSuccess();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Welcome to DocuGen AI
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin" className="text-gray-700 dark:text-gray-300">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="text-gray-700 dark:text-gray-300">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <form onSubmit={(e) => handleSubmit(e, 'signin')} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium">
                Sign In
              </Button>
              
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Admin: admin@docugen.ai / admin123<br />
                User: user@docugen.ai / user123
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium">
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              className="w-full py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaGoogle className="h-4 w-4 mr-2 text-red-500" />
              Google
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleGithubAuth}
              className="w-full py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
