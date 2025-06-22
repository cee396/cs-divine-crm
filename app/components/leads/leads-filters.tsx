
'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FiltersProps {
  filters: {
    status: string
    search: string
    sort: string
  }
  onFiltersChange: (filters: { status: string; search: string; sort: string }) => void
  totalCount: number
}

export default function LeadsFilters({ filters, onFiltersChange, totalCount }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      status: 'all',
      search: '',
      sort: 'recent'
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = filters.status !== 'all' || filters.search !== '' || filters.sort !== 'recent'

  return (
    <div className="enterprise-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, address, email, phone..."
              value={localFilters.search}
              onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={localFilters.status}
            onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="New Lead">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Closed">Closed</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={localFilters.sort}
            onChange={(e) => setLocalFilters({ ...localFilters, sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Owner Name</option>
            <option value="status">Status</option>
            <option value="taxes">Taxes Owed</option>
            <option value="value">Property Value</option>
          </select>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {totalCount.toLocaleString()} leads found
          {hasActiveFilters && (
            <span className="ml-2 text-primary">
              (filtered)
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </Button>
          )}
          
          <Button
            onClick={handleApplyFilters}
            disabled={JSON.stringify(localFilters) === JSON.stringify(filters)}
          >
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.status !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status: {filters.status}
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Search: &quot;{filters.search}&quot;
            </span>
          )}
          {filters.sort !== 'recent' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Sort: {filters.sort}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
