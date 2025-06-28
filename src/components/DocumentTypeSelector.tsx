
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      '📄': <FileText className="h-8 w-8 text-purple-400" />,
      '🔒': <Shield className="h-8 w-8 text-purple-400" />,
      '👥': <Users className="h-8 w-8 text-purple-400" />,
      '🏢': <Building className="h-8 w-8 text-purple-400" />,
      '❤️': <Heart className="h-8 w-8 text-purple-400" />,
      '🚗': <Car className="h-8 w-8 text-purple-400" />
    };
    
    return iconMap[iconName] || <FileText className="h-8 w-8 text-purple-400" />;
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documentTypes.map((doc) => (
          <Card 
            key={doc.id} 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-slate-800/90 border-slate-700 text-white relative overflow-hidden"
            onClick={() => onSelect(doc)}
          >
            <CardHeader className="text-center pb-4 relative z-10">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="p-3 rounded-xl bg-purple-600/20 backdrop-blur-sm">
                  {getIcon(doc.icon)}
                </div>
              </div>
              <CardTitle className="text-lg mb-2 text-white">{doc.name}</CardTitle>
              <CardDescription className="text-sm text-slate-300 leading-relaxed">
                {doc.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 relative z-10">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Badge 
                  variant="secondary" 
                  className="bg-slate-700/50 text-white border-slate-600 text-xs px-2 py-1"
                >
                  {doc.questions.length} questions
                </Badge>
                
                <Badge 
                  variant="secondary" 
                  className="bg-purple-600/20 text-purple-300 border-purple-500/30 text-xs px-2 py-1"
                >
                  {doc.signatureRequired === 'dual' ? '2 Signatures' : 
                   doc.signatureRequired === 'single' ? '1 Signature' : 
                   'No Signature'}
                </Badge>
              </div>
              
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-lg"
                onClick={() => onSelect(doc)}
              >
                Get Started
              </Button>
            </CardContent>
            
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>
    </div>
  );
};
