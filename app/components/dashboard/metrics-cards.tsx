
'use client'

import { useEffect, useState } from 'react'
import { Users, TrendingUp, Phone, CheckCircle } from 'lucide-react'

interface MetricsData {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  closedDeals: number
  avgResponseTime: number
}

export default function MetricsCards() {
  const [metrics, setMetrics] = useState<MetricsData>({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    qualifiedLeads: 0,
    closedDeals: 0,
    avgResponseTime: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [])

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics')
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: 'Total Leads',
      value: metrics.totalLeads,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'All leads in system'
    },
    {
      title: 'New Leads',
      value: metrics.newLeads,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Uncontacted leads'
    },
    {
      title: 'Contacted',
      value: metrics.contactedLeads,
      icon: Phone,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Leads contacted'
    },
    {
      title: 'Qualified',
      value: metrics.qualifiedLeads,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Qualified prospects'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="metric-card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={card.title} className="metric-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="metric-label">{card.title}</p>
              <p className="metric-value">{card.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
