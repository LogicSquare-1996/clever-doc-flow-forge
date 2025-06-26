
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Mail, Phone, MapPin, Calendar, Edit2, FileText, Download, Eye, Trash2, Search, Filter, Plus } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Profile = () => {
  const [isAuthenticated] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock user data - replace with real data from your backend
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    planType: 'Pro User',
    avatar: 'JD'
  };

  // Mock user documents - replace with real data from your backend
  const userDocuments = [
    {
      id: '1',
      name: 'Employment Agreement - Jane Smith',
      type: 'Employment Agreement',
      createdAt: '2024-01-15',
      status: 'completed',
      downloads: 3,
      lastModified: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'NDA - Tech Corp',
      type: 'NDA',
      createdAt: '2024-01-14',
      status: 'signed',
      downloads: 1,
      lastModified: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      name: 'Service Agreement - Startup Ltd',
      type: 'Service Agreement',
      createdAt: '2024-01-12',
      status: 'draft',
      downloads: 0,
      lastModified: '2024-01-12T09:20:00Z'
    },
    {
      id: '4',
      name: 'Partnership Agreement - Innovation Hub',
      type: 'Partnership Agreement',
      createdAt: '2024-01-10',
      status: 'completed',
      downloads: 2,
      lastModified: '2024-01-10T16:10:00Z'
    },
    {
      id: '5',
      name: 'Lease Agreement - Office Space',
      type: 'Lease Agreement',
      createdAt: '2024-01-08',
      status: 'signed',
      downloads: 4,
      lastModified: '2024-01-08T11:25:00Z'
    }
  ];

  const userStats = {
    totalDocuments: userDocuments.length,
    totalDownloads: userDocuments.reduce((sum, doc) => sum + doc.downloads, 0),
    documentsThisMonth: userDocuments.filter(doc => 
      new Date(doc.createdAt).getMonth() === new Date().getMonth()
    ).length,
    completedDocuments: userDocuments.filter(doc => doc.status === 'completed').length
  };

  const filteredDocuments = userDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'signed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header isAuthenticated={isAuthenticated} onAuthClick={() => {}} />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your personal information and documents</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="text-2xl">{userInfo.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{userInfo.name}</CardTitle>
                    <CardDescription className="text-lg">Software Engineer</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{userInfo.planType}</Badge>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Documents</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{userStats.totalDocuments}</div>
                  <p className="text-xs text-purple-600 dark:text-purple-400">+{userStats.documentsThisMonth} this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Downloads</CardTitle>
                  <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{userStats.totalDownloads}</div>
                  <p className="text-xs text-blue-600 dark:text-blue-400">All time</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Completed</CardTitle>
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">{userStats.completedDocuments}</div>
                  <p className="text-xs text-green-600 dark:text-green-400">Documents completed</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">This Month</CardTitle>
                  <User className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{userStats.documentsThisMonth}</div>
                  <p className="text-xs text-orange-600 dark:text-orange-400">New documents</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Documents</CardTitle>
                  <Button onClick={() => window.location.href = '/'}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userDocuments.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{doc.type} • {doc.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Documents</CardTitle>
                  <Button onClick={() => window.location.href = '/'}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="completed">Completed</option>
                      <option value="signed">Signed</option>
                    </select>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.createdAt}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.downloads}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input id="email" type="email" defaultValue={userInfo.email} />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" defaultValue={userInfo.phone} />
                </div>
                
                <div>
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input id="location" defaultValue={userInfo.location} />
                </div>
                
                <div>
                  <Label htmlFor="joinDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member Since
                  </Label>
                  <Input id="joinDate" defaultValue={userInfo.joinDate} disabled />
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>Manage your subscription and payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Stripe payment integration will be available once you connect your Supabase project and configure Stripe.
                  </p>
                  <Button variant="outline" disabled>
                    Configure Payments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
