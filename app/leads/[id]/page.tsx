
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AuthGuard from '@/components/auth-guard';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Building2, 
  MessageSquare,
  Clock,
  Save,
  PhoneCall
} from 'lucide-react';

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
    id: number;
    address: string;
    city: string;
    county: string;
    assessedValue: number;
    taxesOwed: number;
  } | null;
  callLogs: Array<{
    id: number;
    callType: string;
    duration: number | null;
    outcome: string;
    notes: string | null;
    followUpDate: string | null;
    createdAt: string;
    user: { name: string };
  }>;
}

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showCallForm, setShowCallForm] = useState(false);
  const { toast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    status: '',
    priority: '',
    notes: '',
    nextFollowUp: '',
  });

  // Call form states
  const [callForm, setCallForm] = useState({
    callType: 'outbound',
    duration: '',
    outcome: '',
    notes: '',
    followUpDate: '',
    updateLeadStatus: false,
    leadStatus: '',
  });

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const response = await fetch(`/api/leads/${leadId}`);
      if (response.ok) {
        const data = await response.json();
        setLead(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zipCode: data.zipCode || '',
          status: data.status,
          priority: data.priority,
          notes: data.notes || '',
          nextFollowUp: data.nextFollowUp ? data.nextFollowUp.split('T')[0] : '',
        });
      }
    } catch (error) {
      console.error('Failed to fetch lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          nextFollowUp: formData.nextFollowUp || null,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Lead Updated',
          description: 'Lead information has been saved successfully.',
        });
        setEditing(false);
        fetchLead();
      } else {
        toast({
          title: 'Update Failed',
          description: 'Failed to update lead information.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while saving.',
        variant: 'destructive',
      });
    }
  };

  const handleCallSubmit = async () => {
    try {
      const response = await fetch('/api/call-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: parseInt(leadId),
          ...callForm,
          duration: callForm.duration ? parseInt(callForm.duration) : null,
          followUpDate: callForm.followUpDate || null,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Call Logged',
          description: 'Call has been recorded successfully.',
        });
        setShowCallForm(false);
        setCallForm({
          callType: 'outbound',
          duration: '',
          outcome: '',
          notes: '',
          followUpDate: '',
          updateLeadStatus: false,
          leadStatus: '',
        });
        fetchLead();
      } else {
        toast({
          title: 'Failed to Log Call',
          description: 'Something went wrong while recording the call.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong while logging the call.',
        variant: 'destructive',
      });
    }
  };

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

  if (!lead) {
    return (
      <AuthGuard>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Lead Not Found</h2>
            <p className="text-gray-600 mt-2">The requested lead could not be found.</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const statuses = ['new', 'contacted', 'interested', 'not_interested', 'callback', 'closed'];
  const priorities = ['low', 'medium', 'high'];
  const outcomes = ['answered', 'voicemail', 'busy', 'no_answer', 'interested', 'not_interested'];

  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <User className="h-8 w-8 mr-3 text-blue-600" />
              {lead.firstName} {lead.lastName}
            </h1>
            <p className="text-gray-600 mt-2">Lead Details and Call History</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lead Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Contact Information</CardTitle>
                    <div className="space-x-2">
                      {!editing ? (
                        <Button onClick={() => setEditing(true)} variant="outline">
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Button onClick={handleSave} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button onClick={() => setEditing(false)} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      {editing ? (
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{lead.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      {editing ? (
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900">{lead.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      {editing ? (
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center">
                          {lead.email ? (
                            <>
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              {lead.email}
                            </>
                          ) : (
                            'No email'
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      {editing ? (
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center">
                          {lead.phone ? (
                            <>
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              {lead.phone}
                            </>
                          ) : (
                            'No phone'
                          )}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      {editing ? (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          <Input
                            placeholder="Street Address"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            className="md:col-span-2"
                          />
                          <Input
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          />
                          <Input
                            placeholder="State"
                            value={formData.state}
                            onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                          />
                        </div>
                      ) : (
                        <p className="text-gray-900 flex items-center">
                          {lead.address ? (
                            <>
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {lead.address}, {lead.city}, {lead.state} {lead.zipCode}
                            </>
                          ) : (
                            'No address'
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status and Priority */}
              <Card>
                <CardHeader>
                  <CardTitle>Lead Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      {editing ? (
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {statuses.map(status => (
                            <option key={status} value={status}>
                              {status.replace('_', ' ').toUpperCase()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Badge className={`status-${lead.status}`}>
                          {lead.status.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      {editing ? (
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {priorities.map(priority => (
                            <option key={priority} value={priority}>
                              {priority.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Badge className={`priority-${lead.priority}`}>
                          {lead.priority}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Source
                      </label>
                      <p className="text-gray-900 capitalize">{lead.source.replace('_', ' ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  {editing ? (
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Add notes about this lead..."
                    />
                  ) : (
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {lead.notes || 'No notes available'}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Call History */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Call History</CardTitle>
                    <Button onClick={() => setShowCallForm(true)}>
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Log Call
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {lead.callLogs.length > 0 ? (
                    <div className="space-y-4">
                      {lead.callLogs.map((call) => (
                        <div key={call.id} className="border-l-4 border-blue-500 pl-4 py-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{call.outcome}</Badge>
                                <span className="text-sm text-gray-600">{call.callType}</span>
                                {call.duration && (
                                  <span className="text-sm text-gray-600">
                                    {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                                  </span>
                                )}
                              </div>
                              {call.notes && (
                                <p className="text-sm text-gray-700 mt-1">{call.notes}</p>
                              )}
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(call.createdAt).toLocaleString()} • {call.user.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No call history</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lead.phone && (
                    <Button
                      className="w-full"
                      onClick={() => window.open(`tel:${lead.phone}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call {lead.phone}
                    </Button>
                  )}
                  {lead.email && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(`mailto:${lead.email}`, '_self')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Property Information */}
              {lead.property && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      Related Property
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-medium">{lead.property.address}</p>
                      <p className="text-sm text-gray-600">
                        {lead.property.city}, {lead.property.county}
                      </p>
                      <div className="text-sm">
                        <div>Assessed: ${lead.property.assessedValue.toLocaleString()}</div>
                        <div>Taxes Owed: ${lead.property.taxesOwed.toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <div>{new Date(lead.createdAt).toLocaleString()}</div>
                    </div>
                    {lead.lastContactDate && (
                      <div>
                        <span className="text-gray-600">Last Contact:</span>
                        <div>{new Date(lead.lastContactDate).toLocaleString()}</div>
                      </div>
                    )}
                    {lead.nextFollowUp && (
                      <div>
                        <span className="text-gray-600">Next Follow-up:</span>
                        <div className="text-blue-600">
                          {new Date(lead.nextFollowUp).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call Form Modal */}
          {showCallForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <CardTitle>Log Call</CardTitle>
                  <CardDescription>Record call details and outcome</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Call Type
                    </label>
                    <select
                      value={callForm.callType}
                      onChange={(e) => setCallForm(prev => ({ ...prev, callType: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="outbound">Outbound</option>
                      <option value="inbound">Inbound</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Outcome
                    </label>
                    <select
                      value={callForm.outcome}
                      onChange={(e) => setCallForm(prev => ({ ...prev, outcome: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select outcome...</option>
                      {outcomes.map(outcome => (
                        <option key={outcome} value={outcome}>
                          {outcome.replace('_', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (seconds)
                    </label>
                    <Input
                      type="number"
                      value={callForm.duration}
                      onChange={(e) => setCallForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={callForm.notes}
                      onChange={(e) => setCallForm(prev => ({ ...prev, notes: e.target.value }))}
                      className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Call notes..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Follow-up Date
                    </label>
                    <Input
                      type="date"
                      value={callForm.followUpDate}
                      onChange={(e) => setCallForm(prev => ({ ...prev, followUpDate: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCallForm(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCallSubmit} disabled={!callForm.outcome}>
                      Log Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
