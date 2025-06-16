
'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth-guard';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Search, Phone, Mail, MapPin, Calendar, Plus } from 'lucide-react';

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  status: string;
  priority: string;
  source: string;
  notes: string | null;
  lastContactDate: string | null;
  nextFollowUp: string | null;
  createdAt: string;
  property: {
    address: string;
    city: string;
    county: string;
  } | null;
  _count: { callLogs: number };
}

interface LeadsResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(status && { status }),
        ...(priority && { priority }),
      });

      const response = await fetch(`/api/leads?${params}`);
      if (response.ok) {
        const data: LeadsResponse = await response.json();
        setLeads(data.leads);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [pagination.page, search, status, priority]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const statuses = ['new', 'contacted', 'interested', 'not_interested', 'callback', 'closed'];
  const priorities = ['low', 'medium', 'high'];

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      interested: 'bg-green-100 text-green-800',
      not_interested: 'bg-red-100 text-red-800',
      callback: 'bg-purple-100 text-purple-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      low: 'bg-gray-100 text-gray-600',
      medium: 'bg-blue-100 text-blue-600',
      high: 'bg-red-100 text-red-600',
    };
    return colors[priority] || 'bg-gray-100 text-gray-600';
  };

  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Users className="h-8 w-8 mr-3 text-green-600" />
              Lead Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track your investment leads
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search name, email, phone..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Status</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s.replace('_', ' ').toUpperCase()}</option>
                  ))}
                </select>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Priority</option>
                  {priorities.map(p => (
                    <option key={p} value={p}>{p.toUpperCase()}</option>
                  ))}
                </select>
                <Button onClick={fetchLeads} variant="outline">
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Leads ({pagination.total})</CardTitle>
              <CardDescription>
                Showing {leads.length} of {pagination.total} leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contact</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Last Contact</TableHead>
                          <TableHead>Calls</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leads.map((lead) => (
                          <TableRow key={lead.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {lead.firstName} {lead.lastName}
                                </div>
                                {lead.email && (
                                  <div className="text-sm text-gray-600 flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {lead.email}
                                  </div>
                                )}
                                {lead.phone && (
                                  <div className="text-sm text-gray-600 flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {lead.phone}
                                  </div>
                                )}
                                {lead.address && (
                                  <div className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {lead.city}, {lead.state}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {lead.property ? (
                                <div className="text-sm">
                                  <div>{lead.property.address}</div>
                                  <div className="text-gray-600">
                                    {lead.property.city}, {lead.property.county}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-gray-400">No property</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(lead.status)}>
                                {lead.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(lead.priority)}>
                                {lead.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm capitalize">{lead.source.replace('_', ' ')}</span>
                            </TableCell>
                            <TableCell>
                              {lead.lastContactDate ? (
                                <div className="text-sm">
                                  {new Date(lead.lastContactDate).toLocaleDateString()}
                                </div>
                              ) : (
                                <span className="text-gray-400">Never</span>
                              )}
                              {lead.nextFollowUp && (
                                <div className="text-xs text-blue-600 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Follow up: {new Date(lead.nextFollowUp).toLocaleDateString()}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {lead._count.callLogs} calls
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.location.href = `/leads/${lead.id}`}
                                >
                                  View
                                </Button>
                                {lead.phone && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(`tel:${lead.phone}`, '_self')}
                                  >
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {leads.map((lead) => (
                      <Card key={lead.id} className="card-hover">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">
                                  {lead.firstName} {lead.lastName}
                                </h3>
                                {lead.email && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {lead.email}
                                  </p>
                                )}
                                {lead.phone && (
                                  <p className="text-sm text-gray-600 flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {lead.phone}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col space-y-1">
                                <Badge className={getStatusColor(lead.status)}>
                                  {lead.status.replace('_', ' ')}
                                </Badge>
                                <Badge className={getPriorityColor(lead.priority)}>
                                  {lead.priority}
                                </Badge>
                              </div>
                            </div>

                            {lead.property && (
                              <div className="text-sm">
                                <span className="text-gray-600">Property:</span>
                                <div className="font-medium">{lead.property.address}</div>
                                <div className="text-gray-600">
                                  {lead.property.city}, {lead.property.county}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Source:</span>
                                <div className="font-medium capitalize">
                                  {lead.source.replace('_', ' ')}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">Calls:</span>
                                <div className="font-medium">{lead._count.callLogs}</div>
                              </div>
                            </div>

                            {lead.lastContactDate && (
                              <div className="text-sm">
                                <span className="text-gray-600">Last Contact:</span>
                                <div className="font-medium">
                                  {new Date(lead.lastContactDate).toLocaleDateString()}
                                </div>
                              </div>
                            )}

                            {lead.nextFollowUp && (
                              <div className="text-sm flex items-center text-blue-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                Follow up: {new Date(lead.nextFollowUp).toLocaleDateString()}
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.location.href = `/leads/${lead.id}`}
                              >
                                View Details
                              </Button>
                              {lead.phone && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(`tel:${lead.phone}`, '_self')}
                                >
                                  <Phone className="h-4 w-4 mr-2" />
                                  Call
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="flex justify-center space-x-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                        disabled={pagination.page === 1}
                      >
                        Previous
                      </Button>
                      <span className="flex items-center px-4 text-sm text-gray-600">
                        Page {pagination.page} of {pagination.pages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                        disabled={pagination.page === pagination.pages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
