
'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/auth-guard';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Search, ExternalLink, Calendar, DollarSign, MapPin } from 'lucide-react';

interface Property {
  id: number;
  parcelId: string;
  address: string;
  city: string;
  county: string;
  zipCode: string;
  ownerName: string;
  assessedValue: number;
  taxesOwed: number;
  auctionDate: string | null;
  minimumBid: number | null;
  propertyType: string;
  squareFootage: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  yearBuilt: number | null;
  status: string;
  countyUrl: string | null;
  _count: { leads: number };
}

interface PropertiesResponse {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [county, setCounty] = useState('');
  const [status, setStatus] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(county && { county }),
        ...(status && { status }),
      });

      const response = await fetch(`/api/properties?${params}`);
      if (response.ok) {
        const data: PropertiesResponse = await response.json();
        setProperties(data.properties);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [pagination.page, search, county, status]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const counties = ['Miami-Dade', 'Orange', 'Palm Beach', 'Broward'];
  const statuses = ['available', 'sold', 'pending'];

  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Building2 className="h-8 w-8 mr-3 text-blue-600" />
              Florida Tax Deed Properties
            </h1>
            <p className="text-gray-600 mt-2">
              Real property data from major Florida counties
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search address, owner, parcel ID..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Counties</option>
                  {counties.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Status</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
                <Button onClick={fetchProperties} variant="outline">
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Properties Table */}
          <Card>
            <CardHeader>
              <CardTitle>Properties ({pagination.total})</CardTitle>
              <CardDescription>
                Showing {properties.length} of {pagination.total} properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Desktop Table */}
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Financial</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Auction</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties.map((property) => (
                          <TableRow key={property.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{property.address}</div>
                                <div className="text-sm text-gray-600">
                                  {property.city}, {property.county}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Parcel: {property.parcelId}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{property.ownerName}</div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">
                                  <span className="text-gray-600">Assessed:</span> ${property.assessedValue.toLocaleString()}
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-600">Taxes:</span> ${property.taxesOwed.toLocaleString()}
                                </div>
                                {property.minimumBid && (
                                  <div className="text-sm">
                                    <span className="text-gray-600">Min Bid:</span> ${property.minimumBid.toLocaleString()}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm">{property.propertyType}</div>
                                {property.bedrooms && property.bathrooms && (
                                  <div className="text-xs text-gray-600">
                                    {property.bedrooms}BR/{property.bathrooms}BA
                                  </div>
                                )}
                                {property.squareFootage && (
                                  <div className="text-xs text-gray-600">
                                    {property.squareFootage.toLocaleString()} sq ft
                                  </div>
                                )}
                                {property.yearBuilt && (
                                  <div className="text-xs text-gray-600">
                                    Built {property.yearBuilt}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {property.auctionDate ? (
                                <div className="text-sm">
                                  {new Date(property.auctionDate).toLocaleDateString()}
                                </div>
                              ) : (
                                <span className="text-gray-400">TBD</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={property.status === 'available' ? 'default' : 'secondary'}
                              >
                                {property.status}
                              </Badge>
                              {property._count.leads > 0 && (
                                <div className="text-xs text-blue-600 mt-1">
                                  {property._count.leads} leads
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {property.countyUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(property.countyUrl!, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {properties.map((property) => (
                      <Card key={property.id} className="card-hover">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{property.address}</h3>
                                <p className="text-sm text-gray-600">
                                  {property.city}, {property.county}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Parcel: {property.parcelId}
                                </p>
                              </div>
                              <Badge 
                                variant={property.status === 'available' ? 'default' : 'secondary'}
                              >
                                {property.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Owner:</span>
                                <div className="font-medium">{property.ownerName}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Type:</span>
                                <div className="font-medium">{property.propertyType}</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Assessed Value:</span>
                                <div className="font-medium">${property.assessedValue.toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-gray-600">Taxes Owed:</span>
                                <div className="font-medium text-red-600">${property.taxesOwed.toLocaleString()}</div>
                              </div>
                            </div>

                            {property.auctionDate && (
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-gray-600">Auction:</span>
                                <span className="ml-2 font-medium">
                                  {new Date(property.auctionDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-2">
                              {property._count.leads > 0 && (
                                <span className="text-xs text-blue-600">
                                  {property._count.leads} leads
                                </span>
                              )}
                              {property.countyUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(property.countyUrl!, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  County Info
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="flex justify-center space-x-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                        disabled={pagination.page === 1}
                      >
                        Previous
                      </Button>
                      <span className="flex items-center px-4 text-sm text-gray-600">
                        Page {pagination.page} of {pagination.pages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                        disabled={pagination.page === pagination.pages}
                      >
                        Next
                      </Button>
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
