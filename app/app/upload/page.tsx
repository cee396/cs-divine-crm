
'use client'

import { useState, useRef } from 'react'
import Header from '@/components/layout/header'
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface UploadProgress {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  totalRecords: number
  successRecords: number
  errorRecords: number
  errors?: string[]
  filename?: string
}

export default function UploadPage() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
    totalRecords: 0,
    successRecords: 0,
    errorRecords: 0
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select a CSV file.',
          variant: 'destructive'
        })
        return
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: 'File Too Large',
          description: 'Please select a file smaller than 50MB.',
          variant: 'destructive'
        })
        return
      }
      
      setSelectedFile(file)
      setUploadProgress({
        status: 'idle',
        progress: 0,
        totalRecords: 0,
        successRecords: 0,
        errorRecords: 0
      })
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast({
          title: 'Invalid File Type',
          description: 'Please select a CSV file.',
          variant: 'destructive'
        })
        return
      }
      
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({
          title: 'File Too Large',
          description: 'Please select a file smaller than 50MB.',
          variant: 'destructive'
        })
        return
      }
      
      setSelectedFile(file)
      setUploadProgress({
        status: 'idle',
        progress: 0,
        totalRecords: 0,
        successRecords: 0,
        errorRecords: 0
      })
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    setUploadProgress({
      status: 'uploading',
      progress: 10,
      totalRecords: 0,
      successRecords: 0,
      errorRecords: 0,
      filename: selectedFile.name
    })

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.success) {
        setUploadProgress({
          status: 'completed',
          progress: 100,
          totalRecords: result.totalRecords,
          successRecords: result.successRecords,
          errorRecords: result.errorRecords,
          errors: result.errors,
          filename: selectedFile.name
        })

        toast({
          title: 'Upload Successful',
          description: `${result.successRecords} leads imported successfully!`
        })
      } else {
        throw new Error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadProgress({
        status: 'error',
        progress: 0,
        totalRecords: 0,
        successRecords: 0,
        errorRecords: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      })

      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      })
    }
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setUploadProgress({
      status: 'idle',
      progress: 0,
      totalRecords: 0,
      successRecords: 0,
      errorRecords: 0
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Upload className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Upload Leads</h1>
          </div>
          <p className="text-gray-600">
            Import tax deed leads from CSV files. All leads will be automatically marked as "New Lead" status.
          </p>
        </div>

        {/* Upload Section */}
        <div className="enterprise-card p-8">
          {uploadProgress.status === 'idle' && (
            <>
              {/* File Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedFile ? selectedFile.name : 'Upload CSV File'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedFile 
                    ? `File size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : 'Drag and drop your CSV file here, or click to browse'
                  }
                </p>
                <p className="text-sm text-gray-500">
                  Supports FL Counties format with 153+ fields. Maximum file size: 50MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{selectedFile.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetUpload}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={uploadFile} className="px-8">
                    Upload & Process
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Upload Progress */}
          {(uploadProgress.status === 'uploading' || uploadProgress.status === 'processing') && (
            <div className="text-center">
              <div className="enterprise-spinner mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {uploadProgress.status === 'uploading' ? 'Uploading...' : 'Processing...'}
              </h3>
              <p className="text-gray-600 mb-4">{uploadProgress.filename}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{uploadProgress.progress}% complete</p>
            </div>
          )}

          {/* Upload Success */}
          {uploadProgress.status === 'completed' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Completed!</h3>
              <p className="text-gray-600 mb-6">{uploadProgress.filename}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{uploadProgress.totalRecords}</p>
                  <p className="text-sm text-blue-800">Total Records</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{uploadProgress.successRecords}</p>
                  <p className="text-sm text-green-800">Successfully Imported</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{uploadProgress.errorRecords}</p>
                  <p className="text-sm text-red-800">Errors</p>
                </div>
              </div>

              {uploadProgress.errors && uploadProgress.errors.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-yellow-800 mb-2">Import Warnings:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {uploadProgress.errors.slice(0, 5).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                    {uploadProgress.errors.length > 5 && (
                      <li>• And {uploadProgress.errors.length - 5} more...</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="space-x-4">
                <Button onClick={resetUpload} variant="outline">
                  Upload Another File
                </Button>
                <Button asChild>
                  <a href="/leads">View Leads</a>
                </Button>
              </div>
            </div>
          )}

          {/* Upload Error */}
          {uploadProgress.status === 'error' && (
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Failed</h3>
              {uploadProgress.errors && uploadProgress.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <ul className="text-sm text-red-700 space-y-1">
                    {uploadProgress.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Button onClick={resetUpload}>
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 enterprise-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">CSV Upload Instructions</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p><strong>Supported Format:</strong> FL Counties CSV format with up to 153+ fields</p>
            <p><strong>File Requirements:</strong> CSV file format (.csv), maximum 50MB</p>
            <p><strong>Lead Status:</strong> All imported leads will be automatically set to "New Lead" status</p>
            <p><strong>Duplicate Handling:</strong> Duplicate records (same parcel ID) will be skipped</p>
            <p><strong>Required Fields:</strong> At minimum, property address or parcel ID should be present</p>
          </div>
        </div>
      </main>
    </div>
  )
}
