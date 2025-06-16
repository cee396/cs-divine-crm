
'use client';

import { useState } from 'react';
import AuthGuard from '@/components/auth-guard';
import Navigation from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';

interface ImportResult {
  success: boolean;
  importId: number;
  totalRows: number;
  successRows: number;
  errorRows: number;
  errors: string[];
}

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select a CSV file.',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please select a CSV file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/csv-import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        toast({
          title: 'Import Completed',
          description: `Successfully imported ${data.successRows} leads.`,
        });
      } else {
        toast({
          title: 'Import Failed',
          description: data.error || 'Failed to import CSV file.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Upload Error',
        description: 'Something went wrong during upload.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      ['first_name', 'last_name', 'email', 'phone', 'address', 'city', 'state', 'zip_code', 'notes'],
      ['John', 'Doe', 'john.doe@email.com', '(555) 123-4567', '123 Main St', 'Miami', 'FL', '33101', 'Interested in tax deed properties'],
      ['Jane', 'Smith', 'jane.smith@email.com', '(555) 987-6543', '456 Oak Ave', 'Orlando', 'FL', '32801', 'Skip traced lead'],
      ['Bob', 'Johnson', 'bob.johnson@email.com', '(555) 555-5555', '789 Pine Rd', 'Tampa', 'FL', '33602', 'High priority contact'],
    ];

    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_leads.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AuthGuard>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Upload className="h-8 w-8 mr-3 text-orange-600" />
              CSV Lead Import
            </h1>
            <p className="text-gray-600 mt-2">
              Upload skip traced leads from CSV files
            </p>
          </div>

          {/* Instructions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Import Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Supported CSV Columns:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <Badge variant="outline">first_name</Badge>
                    <Badge variant="outline">last_name</Badge>
                    <Badge variant="outline">email</Badge>
                    <Badge variant="outline">phone</Badge>
                    <Badge variant="outline">address</Badge>
                    <Badge variant="outline">city</Badge>
                    <Badge variant="outline">state</Badge>
                    <Badge variant="outline">zip_code</Badge>
                    <Badge variant="outline">notes</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Alternative Column Names:</h4>
                  <p className="text-sm text-gray-600">
                    The system also recognizes common variations like "firstname", "lastname", "phone_number", 
                    "email_address", "street_address", "zipcode", etc.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• First name and last name are required</li>
                    <li>• Phone numbers will be automatically formatted</li>
                    <li>• Email addresses will be validated</li>
                    <li>• Duplicate leads will be skipped</li>
                  </ul>
                </div>
                <Button variant="outline" onClick={downloadSampleCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upload Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <CardDescription>
                Select a CSV file containing your skip traced leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  {file && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  className="w-full md:w-auto"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Leads
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2 text-red-600" />
                  )}
                  Import Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{result.totalRows}</div>
                      <div className="text-sm text-blue-600">Total Rows</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{result.successRows}</div>
                      <div className="text-sm text-green-600">Successfully Imported</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{result.errorRows}</div>
                      <div className="text-sm text-red-600">Errors/Skipped</div>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-orange-600" />
                        Import Errors
                      </h4>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                        <ul className="text-sm space-y-1">
                          {result.errors.map((error, index) => (
                            <li key={index} className="text-orange-700">
                              • {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {result.successRows > 0 && (
                    <div className="flex justify-center">
                      <Button onClick={() => window.location.href = '/leads'}>
                        View Imported Leads
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
