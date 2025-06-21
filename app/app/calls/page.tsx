
'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/header'
import { Phone, Calendar, Clock, User, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDistanceToNow } from 'date-fns'

interface CallLog {
  id: string
  leadId: string
  userId: string
  callDate: string
  duration: number | null
  outcome: string
  notes: string | null
  followUpDate: string | null
  createdAt: string
  lead: {
    ownerName: string | null
    propertyAddress: string | null
    county: string | null
  }
  user: {
    name: string
    email: string
  }
}

export default function CallLogsPage() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCallLogs()
  }, [])

  const fetchCallLogs = async () => {
    try {
      const response = await fetch('/api/call-logs')
      if (response.ok) {
        const data = await response.json()
        setCallLogs(data.callLogs || [])
      }
    } catch (error) {
      console.error('Error fetching call logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome.toLowerCase()) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'voicemail':
        return 'bg-yellow-100 text-yellow-800'
      case 'no answer':
        return 'bg-gray-100 text-gray-800'
      case 'busy':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Phone className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Call Logs</h1>
          </div>
          <p className="text-gray-600">
            Track all communication attempts and outcomes with your leads
          </p>
        </div>

        {callLogs.length === 0 ? (
          <div className="enterprise-card p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No call logs yet</h3>
            <p className="text-gray-600 mb-6">
              Start making calls to your leads to see communication history here.
            </p>
            <Button asChild>
              <a href="/leads">View Leads</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {callLogs.map((callLog) => (
              <div key={callLog.id} className="enterprise-card p-6 animate-fade-in">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {callLog.lead.ownerName || 'Unknown Owner'}
                      </h3>
                      <span className={`status-badge ${getOutcomeColor(callLog.outcome)}`}>
                        {callLog.outcome}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDistanceToNow(new Date(callLog.callDate), { addSuffix: true })}
                      </div>
                      
                      {callLog.duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {callLog.duration} minutes
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {callLog.user.name}
                      </div>
                    </div>

                    {callLog.lead.propertyAddress && (
                      <p className="text-sm text-gray-600 mb-2">
                        Property: {callLog.lead.propertyAddress}
                        {callLog.lead.county && `, ${callLog.lead.county} County`}
                      </p>
                    )}

                    {callLog.notes && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700">{callLog.notes}</p>
                        </div>
                      </div>
                    )}

                    {callLog.followUpDate && (
                      <div className="text-sm text-blue-600">
                        Follow up scheduled: {formatDistanceToNow(new Date(callLog.followUpDate), { addSuffix: true })}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/leads/${callLog.leadId}`}>View Lead</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
