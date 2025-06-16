
'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth-guard';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Phone, Upload, Calendar, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalProperties: number;
  totalLeads: number;
  totalCallLogs: number;
  recentImports: number;
  leadsByStatus: Array<{ status: string; _count: number }>;
  propertiesByCounty: Array<{ county: string; _count: number }>;
  upcomingAuctions: Array<{
    id: number;
    address: string;
    city: string;
    county: string;
    auctionDate: string;
    minimumBid: number;
  }>;
  recentActivity: Array<{
    id: number;
    outcome: string;
    createdAt: string;
    lead: { firstName: string; lastName: string };
    user: { name: string };
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AuthGuard>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Overview of your tax deed investment platform
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Properties</p>
                    <p className="text-3xl font-bold text-gray-900 counter">
                      {stats?.totalProperties || 0}
                    </p>
                  </div>
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-3xl font-bold text-gray-900 counter">
                      {stats?.totalLeads || 0}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Call Logs</p>
                    <p className="text-3xl font-bold text-gray-900 counter">
                      {stats?.totalCallLogs || 0}
                    </p>
                  </div>
                  <Phone className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CSV Imports</p>
                    <p className="text-3xl font-bold text-gray-900 counter">
                      {stats?.recentImports || 0}
                    </p>
                    <p className="text-xs text-gray-500">Last 30 days</p>
                  </div>
                  <Upload className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Leads by Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Leads by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.leadsByStatus?.map((item) => (
                    <div key={item.status} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Badge 
                          className={`status-${item.status} mr-3`}
                          variant="outline"
                        >
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <span className="font-semibold">{item._count}</span>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-4">No lead data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Properties by County */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Properties by County
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.propertiesByCounty?.map((item) => (
                    <div key={item.county} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.county}</span>
                      <Badge variant="secondary">{item._count}</Badge>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-4">No property data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Auctions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Auctions
                </CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.upcomingAuctions?.length ? (
                    stats.upcomingAuctions.map((auction) => (
                      <div key={auction.id} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{auction.address}</p>
                            <p className="text-xs text-gray-600">
                              {auction.city}, {auction.county}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(auction.auctionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline">
                            ${auction.minimumBid?.toLocaleString()}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No upcoming auctions</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Recent Call Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentActivity?.length ? (
                    stats.recentActivity.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {activity.lead.firstName} {activity.lead.lastName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {activity.outcome} • {activity.user.name}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
