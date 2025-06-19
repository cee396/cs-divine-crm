
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ExternalLink, MapPin, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Lead {
  id: string
  ownerName: string | null
  propertyAddress: string | null
  propertyCity: string | null
  county: string | null
  status: string
  taxesOwed: number | null
  createdAt: string
}

export default function RecentLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentLeads()
  }, [])

  const fetchRecentLeads = async () => {
    try {
      const response = await fetch('/api/leads?limit=5&sort=recent')
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
      }
    } catch (error) {
      console.error('Error fetching recent leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Lead':
        return 'status-new'
      case 'Contacted':
        return 'status-contacted'
      case 'Qualified':
        return 'status-qualified'
      case 'Closed':
        return 'status-closed'
      default:
        return 'status-new'
    }
  }

  if (loading) {
    return (
      <div className="enterprise-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="enterprise-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
        <Link href="/leads">
          <Button variant="outline" size="sm">
            View All
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {leads.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No leads found. Upload your first CSV file to get started.</p>
          <Link href="/upload">
            <Button className="mt-4">Upload Leads</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead, index) => (
            <div key={lead.id} className="border-b border-gray-100 pb-4 last:border-b-0 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">
                      {lead.ownerName || 'Unknown Owner'}
                    </h4>
                    <span className={`status-badge ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  
                  {lead.propertyAddress && (
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lead.propertyAddress}
                      {lead.propertyCity && `, ${lead.propertyCity}`}
                      {lead.county && `, ${lead.county} County`}
                    </div>
                  )}
                  
                  {lead.taxesOwed && (
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${lead.taxesOwed.toLocaleString()} owed
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Added {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                  </p>
                </div>
                
                <Link href={`/leads/${lead.id}`}>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
