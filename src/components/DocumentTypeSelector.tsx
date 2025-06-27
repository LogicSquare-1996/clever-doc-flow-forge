
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, Users, Building, Heart, Car } from 'lucide-react';
import { DocumentType } from '@/pages/Index';
import { apiClient } from '@/lib/api';

interface DocumentTypeSelectorProps {
  onSelect: (document: DocumentType) => void;
}

export const DocumentTypeSelector = ({ onSelect }: DocumentTypeSelectorProps) => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates = await apiClient.getDocumentTemplates();
        setDocumentTypes(templates);
      } catch (error) {
        console.error('Failed to fetch document templates:', error);
        // Fallback to default templates
        setDocumentTypes([
          {
            id: 'employment-agreement',
            name: 'Employment Agreement',
            description: 'Comprehensive employment contract template',
            icon: '📄',
            questions: [
              { id: 'employeeName', text: 'Employee Full Name', type: 'text', required: true },
              { id: 'position', text: 'Job Position', type: 'text', required: true },
              { id: 'salary', text: 'Annual Salary', type: 'number', required: true },
              { id: 'startDate', text: 'Start Date', type: 'date', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'nda',
            name: 'Non-Disclosure Agreement',
            description: 'Protect confidential information',
            icon: '🔒',
            questions: [
              { id: 'disclosingParty', text: 'Disclosing Party Name', type: 'text', required: true },
              { id: 'receivingParty', text: 'Receiving Party Name', type: 'text', required: true },
              { id: 'purposeDescription', text: 'Purpose Description', type: 'textarea', required: true }
            ],
            signatureRequired: 'dual'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '📄': <FileText className="h-8 w-8 text-blue-600" />,
      '🔒': <Shield className="h-8 w-8 text-green-600" />,
      '👥': <Users className="h-8 w-8 text-purple-600" />,
      '🏢': <Building className="h-8 w-8 text-orange-600" />,
      '❤️': <Heart className="h-8 w-8 text-red-600" />,
      '🚗': <Car className="h-8 w-8 text-cyan-600" />
    };
    
    return iconMap[iconName] || <FileText className="h-8 w-8 text-gray-600" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading document templates...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Choose Your Document Type
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Select from our professionally crafted templates to generate your legal document instantly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((doc) => (
          <Card key={doc.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-300 cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(doc.icon)}
              </div>
              <CardTitle className="text-xl mb-2">{doc.name}</CardTitle>
              <CardDescription className="text-sm">{doc.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {doc.questions.length} questions to complete
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {doc.signatureRequired === 'dual' ? 'Dual signatures required' : 
                   doc.signatureRequired === 'single' ? 'Single signature required' : 
                   'No signature required'}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Professional template
                </div>
              </div>
              <Button 
                onClick={() => onSelect(doc)}
                className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
