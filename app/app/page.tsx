
import Header from '@/components/layout/header'
import MetricsCards from '@/components/dashboard/metrics-cards'
import RecentLeads from '@/components/dashboard/recent-leads'
import { BarChart3, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Monitor your tax deed lead pipeline and track performance metrics
          </p>
        </div>

        {/* Metrics Section */}
        <div className="mb-8">
          <MetricsCards />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-1">
            <RecentLeads />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="enterprise-card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <a
                  href="/upload"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Upload New Leads</h4>
                      <p className="text-sm text-gray-600">Import leads from CSV file</p>
                    </div>
                  </div>
                </a>
                
                <a
                  href="/leads"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Manage Leads</h4>
                      <p className="text-sm text-gray-600">View and organize your leads</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
