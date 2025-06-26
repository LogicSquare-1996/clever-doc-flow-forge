
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Trash2, 
  ArrowLeft,
  Save,
  Key
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [isAuthenticated] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    documentUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    pushNotifications: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    shareAnalytics: false,
    allowDataExport: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    fontSize: 'medium',
    compactMode: false
  });

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePrivacyChange = (setting: string, value: boolean | string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleAppearanceChange = (setting: string, value: boolean | string) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export will be ready shortly. You'll receive an email when it's complete.",
    });
  };

  const handleDeleteAccount = () => {
    // This would typically show a confirmation dialog
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex flex-col transition-colors">
      <Header isAuthenticated={isAuthenticated} onAuthClick={() => {}} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Button variant="ghost" onClick={handleBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          </div>

          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <SettingsIcon className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Document Updates</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when documents are updated</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.documentUpdates}
                      onCheckedChange={(checked) => handleNotificationChange('documentUpdates', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Security Alerts</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Important security notifications</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Marketing Emails</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Promotional and marketing content</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Browser push notifications</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Profile Visibility</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Control who can see your profile</p>
                    <select
                      value={privacySettings.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Share Analytics</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Help improve our service with usage data</p>
                    </div>
                    <Switch 
                      checked={privacySettings.shareAnalytics}
                      onCheckedChange={(checked) => handlePrivacyChange('shareAnalytics', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Allow Data Export</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Enable data export functionality</p>
                    </div>
                    <Switch 
                      checked={privacySettings.allowDataExport}
                      onCheckedChange={(checked) => handlePrivacyChange('allowDataExport', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Theme</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Choose your preferred theme</p>
                    <select
                      value={appearanceSettings.theme}
                      onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Font Size</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Adjust text size for better readability</p>
                    <select
                      value={appearanceSettings.fontSize}
                      onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-300 font-medium">Compact Mode</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Use compact layout with reduced spacing</p>
                    </div>
                    <Switch 
                      checked={appearanceSettings.compactMode}
                      onCheckedChange={(checked) => handleAppearanceChange('compactMode', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Password & Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <span>Update Password</span>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div>
                        <h3 className="font-medium text-blue-900 dark:text-blue-100">Export Your Data</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Download all your documents and data</p>
                      </div>
                      <Button variant="outline" onClick={handleExportData} className="flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div>
                        <h3 className="font-medium text-red-900 dark:text-red-100">Delete Account</h3>
                        <p className="text-sm text-red-700 dark:text-red-300">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" onClick={handleDeleteAccount} className="flex items-center space-x-2">
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button onClick={handleSaveSettings} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save All Settings</span>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
