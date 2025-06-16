
'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth-guard';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Phone, Search, Calendar, Clock, User } from 'lucide-react';

interface CallLog {
  id: number;
  callType: string;
  duration: number | null;
  outcome: string;
  notes: string | null;
  followUpDate: string | null;
  createdAt: string;
  lead: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string | null;
  };
  user: {
    name: string;
  };
}

export default function CallLogsPage() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [outcome, setOutcome] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    fetchCallLogs();
  }, []);

  const fetchCallLogs = async () => {
    setLoading(true);
    try {
      // For now, we'll fetch recent call logs from the dashboard stats
      // In a real implementation, you'd have a dedicated call logs endpoint
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setCallLogs(data.recentActivity || []);
      }
    } catch (error) {
      console.error('Failed to fetch call logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getOutcomeColor = (outcome: string) => {
    const colors: { [key: string]: string } = {
      answered: 'bg-green-100 text-green-800',
      voicemail: 'bg-yellow-100 text-yellow-800',
      busy: 'bg-orange-100 text-orange-800',
      no_answer: 'bg-red-100 text-red-800',
      interested: 'bg-blue-100 text-blue-800',
      not_interested: 'bg-gray-100 text-gray-800',
    };
    return colors[outcome] || 'bg-gray-100 text-gray-800';
  };

  const outcomes = ['answered', 'voicemail', 'busy', 'no_answer', 'interested', 'not_interested'];

  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Phone className="h-8 w-8 mr-3 text-purple-600" />
              Call Logs
            </h1>
            <p className="text-gray-600 mt-2">
              Track and review all call activities
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search lead name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Outcomes</option>
                  {outcomes.map(o => (
                    <option key={o} value={o}>
                      {o.replace('_', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From Date"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To Date"
                />
                <Button onClick={fetchCallLogs} variant="outline">
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Call Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Call Activity</CardTitle>
              <CardDescription>
                Latest call logs and outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Lead</TableHead>
                          <TableHead>Call Type</TableHead>
                          <TableHead>Outcome</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Agent</TableHead>
                          <TableHead>Date/Time</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {callLogs.map((call) => (
                          <TableRow key={call.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {call.lead.firstName} {call.lead.lastName}
                                </div>
                                {call.lead.phone && (
                                  <div className="text-sm text-gray-600">
                                    {call.lead.phone}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {call.callType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getOutcomeColor(call.outcome)}>
                                {call.outcome.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                {formatDuration(call.duration)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs truncate">
                                {call.notes || 'No notes'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-gray-400" />
                                {call.user.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                {new Date(call.createdAt).toLocaleDateString()}
                                <div className="text-gray-500">
                                  {new Date(call.createdAt).toLocaleTimeString()}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.location.href = `/leads/${call.lead.id}`}
                              >
                                View Lead
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {callLogs.map((call) => (
                      <Card key={call.id} className="card-hover">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">
                                  {call.lead.firstName} {call.lead.lastName}
                                </h3>
                                {call.lead.phone && (
                                  <p className="text-sm text-gray-600">{call.lead.phone}</p>
                                )}
                              </div>
                              <div className="flex flex-col space-y-1">
                                <Badge className={getOutcomeColor(call.outcome)}>
                                  {call.outcome.replace('_', ' ')}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                  {call.callType}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Duration:</span>
                                <div className="font-medium flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDuration(call.duration)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">Agent:</span>
                                <div className="font-medium flex items-center">
                                  <User className="h-3 w-3 mr-1" />
                                  {call.user.name}
                                </div>
                              </div>
                            </div>

                            {call.notes && (
                              <div className="text-sm">
                                <span className="text-gray-600">Notes:</span>
                                <p className="text-gray-900 mt-1">{call.notes}</p>
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-2 text-sm">
                              <span className="text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(call.createdAt).toLocaleString()}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.location.href = `/leads/${call.lead.id}`}
                              >
                                View Lead
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {callLogs.length === 0 && (
                    <div className="text-center py-8">
                      <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Call Logs</h3>
                      <p className="text-gray-600">
                        Start making calls to see activity here.
                      </p>
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
