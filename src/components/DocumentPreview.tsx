
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, RotateCcw, Lock } from 'lucide-react';

interface DocumentPreviewProps {
  content: string;
  onDownload: () => void;
  onBack: () => void;
  isAuthenticated: boolean;
}

export const DocumentPreview = ({ content, onDownload, onBack, isAuthenticated }: DocumentPreviewProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Preview</h2>
        <p className="text-gray-600">
          Review your generated document below. {!isAuthenticated && 'Sign in to download the final document.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Generated Document</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-8 min-h-96 shadow-inner">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {content}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          {/* Download Section */}
          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isAuthenticated ? (
                <>
                  <Button 
                    onClick={onDownload} 
                    className="w-full flex items-center space-x-2"
                    size="lg"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download PDF</span>
                  </Button>
                  <Button 
                    onClick={onDownload} 
                    variant="outline" 
                    className="w-full flex items-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Word</span>
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <Lock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm text-amber-800 font-medium">
                      Sign in required to download
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Create a free account to access your documents
                    </p>
                  </div>
                  <Button 
                    onClick={onDownload} 
                    className="w-full"
                    size="lg"
                  >
                    Sign In to Download
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Generated:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Format:</span>
                <span className="font-medium">PDF, Word</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Ready</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                onClick={onBack} 
                className="w-full flex items-center space-x-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Create New Document</span>
              </Button>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Review all details carefully before downloading</li>
                <li>• Save a digital copy for your records</li>
                <li>• Consider legal review for complex agreements</li>
                <li>• Print on quality paper for physical copies</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
