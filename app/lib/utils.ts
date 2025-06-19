
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) {
    return '$0'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return ''
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Check if it's a valid US phone number
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'new lead':
      return 'bg-blue-100 text-blue-800'
    case 'contacted':
      return 'bg-yellow-100 text-yellow-800'
    case 'qualified':
      return 'bg-green-100 text-green-800'
    case 'closed':
      return 'bg-gray-100 text-gray-800'
    case 'not interested':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function calculateDaysOverdue(saleDate: string | Date | null): number {
  if (!saleDate) return 0
  
  const sale = typeof saleDate === 'string' ? new Date(saleDate) : saleDate
  const today = new Date()
  const diffTime = today.getTime() - sale.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

export function sanitizeString(str: string | null | undefined): string {
  if (!str) return ''
  return str.trim().replace(/\s+/g, ' ')
}

export function parseCSVValue(value: string | undefined): string | null {
  if (!value || value.trim() === '' || value.toLowerCase() === 'null' || value.toLowerCase() === 'undefined') {
    return null
  }
  return value.trim()
}

export function parseCSVNumber(value: string | undefined): number | null {
  if (!value || value.trim() === '' || value.toLowerCase() === 'null') {
    return null
  }
  
  // Remove currency symbols and commas
  const cleaned = value.replace(/[$,]/g, '')
  const parsed = parseFloat(cleaned)
  
  return isNaN(parsed) ? null : parsed
}

export function parseCSVDate(value: string | undefined): Date | null {
  if (!value || value.trim() === '' || value.toLowerCase() === 'null') {
    return null
  }
  
  const parsed = new Date(value)
  return isNaN(parsed.getTime()) ? null : parsed
}
