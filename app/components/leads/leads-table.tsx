
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { 
  Eye, Phone, Mail, MapPin, DollarSign, Calendar, 
  ChevronLeft, ChevronRight, RefreshCw 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatPhoneNumber, getStatusColor, getPriorityColor } from '@/lib/utils'

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

interface LeadsTableProps {
  leads: Lead[]
  loading: boolean
  pagination: Pagination
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onRefresh: () => void
}

export default function LeadsTable({
  leads,
  loading,
  pagination,
  onPageChange,
  onPageSizeChange,
  onRefresh
}: LeadsTableProps) {
  
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600 mb-6">
            Get started by uploading your first CSV file or adjust your search filters.
          </p>
          <div className="space-x-3">
            <Button asChild>
              <Link href="/upload">Upload Leads</Link>
            </Button>
            <Button variant="outline" onClick={onRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Table Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {pagination.totalCount.toLocaleString()} Leads
        </h3>
        <div className="flex items-center space-x-3">
          <select
            value={pagination.pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
          <Button variant="ghost" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Owner / Property</th>
              <th>Status</th>
              <th>Contact Info</th>
              <th>Financial</th>
              <th>Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                {/* Owner / Property */}
                <td>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {lead.ownerName || 'Unknown Owner'}
                    </h4>
                    {lead.propertyAddress && (
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {lead.propertyAddress}
                        {lead.propertyCity && `, ${lead.propertyCity}`}
                        {lead.propertyState && `, ${lead.propertyState}`}
                        {lead.propertyZip && ` ${lead.propertyZip}`}
                      </div>
                    )}
                    {lead.county && (
                      <div className="text-xs text-gray-500 mt-1">
                        {lead.county} County
                      </div>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td>
                  <div className="space-y-1">
                    <span className={`status-badge ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    {lead.priority && (
                      <div>
                        <span className={`status-badge ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Contact Info */}
                <td>
                  <div className="space-y-1">
                    {lead.ownerPhone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-3 h-3 mr-1" />
                        {formatPhoneNumber(lead.ownerPhone)}
                      </div>
                    )}
                    {lead.ownerEmail && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {lead.ownerEmail}
                      </div>
                    )}
                    {lead.contactAttempts > 0 && (
                      <div className="text-xs text-gray-500">
                        {lead.contactAttempts} attempts
                      </div>
                    )}
                  </div>
                </td>

                {/* Financial */}
                <td>
                  <div className="space-y-1">
                    {lead.taxesOwed && (
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-3 h-3 mr-1 text-red-500" />
                        <span className="font-medium text-red-600">
                          {formatCurrency(lead.taxesOwed)} owed
                        </span>
                      </div>
                    )}
                    {lead.assessedValue && (
                      <div className="text-sm text-gray-600">
                        Value: {formatCurrency(lead.assessedValue)}
                      </div>
                    )}
                    {lead.yearsDelinquent && (
                      <div className="text-xs text-gray-500">
                        {lead.yearsDelinquent} years delinquent
                      </div>
                    )}
                  </div>
                </td>

                {/* Activity */}
                <td>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Added {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true })}
                    </div>
                    {lead.lastContactDate && (
                      <div className="text-xs text-gray-500">
                        Last contact: {formatDistanceToNow(new Date(lead.lastContactDate), { addSuffix: true })}
                      </div>
                    )}
                    {lead.nextFollowUpDate && (
                      <div className="text-xs text-blue-600">
                        Follow up: {formatDistanceToNow(new Date(lead.nextFollowUpDate), { addSuffix: true })}
                      </div>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center space-x-2">
                    <Link href={`/leads/${lead.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    {lead.ownerPhone && (
                      <a href={`tel:${lead.ownerPhone}`}>
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {lead.ownerEmail && (
                      <a href={`mailto:${lead.ownerEmail}`}>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.totalCount)} of{' '}
            {pagination.totalCount} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const page = i + Math.max(1, pagination.page - 2)
                if (page > pagination.totalPages) return null
                
                return (
                  <Button
                    key={page}
                    variant={page === pagination.page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
