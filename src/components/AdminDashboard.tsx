
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Download, TrendingUp, Activity, Eye } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data - replace with real data from your backend
  const stats = {
    totalDocuments: 1247,
    totalUsers: 892,
    totalDownloads: 3456,
    monthlyGrowth: 12.5,
    activeUsers: 234,
    documentsToday: 45
  };

  const popularDocuments = [
    { name: 'NDA', count: 456, percentage: 35 },
    { name: 'Employment Agreement', count: 298, percentage: 23 },
    { name: 'Service Agreement', count: 234, percentage: 18 },
    { name: 'Partnership Agreement', count: 189, percentage: 15 },
    { name: 'Lease Agreement', count: 70, percentage: 9 }
  ];

  const recentActivities = [
    { user: 'john@example.com', action: 'Generated NDA document', time: '2 minutes ago' },
    { user: 'sarah@example.com', action: 'Downloaded Employment Agreement', time: '5 minutes ago' },
    { user: 'mike@example.com', action: 'Signed up for account', time: '12 minutes ago' },
    { user: 'admin@example.com', action: 'Added new document type', time: '25 minutes ago' },
    { user: 'lisa@example.com', action: 'Updated profile', time: '1 hour ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.totalDocuments.toLocaleString()}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">+{stats.documentsToday} today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-600 dark:text-green-400">+{stats.monthlyGrowth}% this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Downloads</CardTitle>
            <Download className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{stats.monthlyGrowth}%</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">Monthly</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.activeUsers}</div>
            <p className="text-xs text-indigo-600 dark:text-indigo-400">Online now</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-pink-700 dark:text-pink-300">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-pink-600 dark:text-pink-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900 dark:text-pink-100">12.3K</div>
            <p className="text-xs text-pink-600 dark:text-pink-400">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Popular Document Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{doc.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{doc.count}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${doc.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{doc.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
