'use client'

import { useState, useEffect } from 'react'

import Header from '@/components/layout/header'
import LeadsTable from '@/components/leads/leads-table'
import LeadsFilters from '@/components/leads/leads-filters'
import { Users, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = "force-dynamic"

interface Lead {
  id: string
  ownerName: string | null
  propertyAddress: string | null
  propertyCity: string | null
  propertyState: string | null
  propertyZip: string | null
  county: string | null
  status: string
  taxesOwed: number | null
  ownerPhone: string | null
  ownerEmail: string | null
  createdAt: string
  updatedAt: string
  priority: string | null
  contactAttempts: number
  lastContactDate: string | null
  nextFollowUpDate: string | null
  assessedValue: number | null
  marketValue: number | null
  yearsDelinquent: number | null
}

interface Pagination {
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0
  })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sort: 'recent'
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Initialize with default filters
    setFilters({ status: 'all', search: '', sort: 'recent' })
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [filters, pagination.page, pagination.pageSize])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        pageSize: pagination.pageSize.toString(),
        status: filters.status,
        search: filters.search,
        sort: filters.sort
      })

      const response = await fetch(`/api/leads?${params}`)
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
        setPagination(data.pagination || pagination)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to first page
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(prev => ({ ...prev, pageSize, page: 1 }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Users className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
              </div>
              <p className="text-gray-600">
                Manage and track your tax deed leads
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              
              <Button asChild>
                <a href="/upload">Upload Leads</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6">
            <LeadsFilters
              filters={filters}
              onFiltersChange={handleFilterChange}
              totalCount={pagination.totalCount}
            />
          </div>
        )}

        {/* Stats Bar */}
        <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {pagination.totalCount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 ml-2">total leads</span>
              </div>
              
              {filters.status !== 'all' && (
                <div>
                  <span className="text-lg font-semibold text-primary">
                    {leads.length}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    {filters.status.toLowerCase()} leads
                  </span>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="enterprise-card">
          <LeadsTable
            leads={leads}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onRefresh={fetchLeads}
          />
        </div>
      </main>
    </div>
  )
}
