
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Shield, Users, Building, Heart, Car, Home, Briefcase, Scale, FileCheck, UserCheck, Globe } from 'lucide-react';
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
          },
          {
            id: 'service-agreement',
            name: 'Service Agreement',
            description: 'Professional service contract template',
            icon: '👥',
            questions: [
              { id: 'serviceProvider', text: 'Service Provider Name', type: 'text', required: true },
              { id: 'clientName', text: 'Client Name', type: 'text', required: true },
              { id: 'serviceDescription', text: 'Service Description', type: 'textarea', required: true },
              { id: 'paymentTerms', text: 'Payment Terms', type: 'text', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'rental-agreement',
            name: 'Rental Agreement',
            description: 'Property rental contract template',
            icon: '🏢',
            questions: [
              { id: 'landlordName', text: 'Landlord Name', type: 'text', required: true },
              { id: 'tenantName', text: 'Tenant Name', type: 'text', required: true },
              { id: 'propertyAddress', text: 'Property Address', type: 'textarea', required: true },
              { id: 'monthlyRent', text: 'Monthly Rent', type: 'number', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'partnership-agreement',
            name: 'Partnership Agreement',
            description: 'Business partnership contract',
            icon: '❤️',
            questions: [
              { id: 'partner1Name', text: 'Partner 1 Name', type: 'text', required: true },
              { id: 'partner2Name', text: 'Partner 2 Name', type: 'text', required: true },
              { id: 'businessName', text: 'Business Name', type: 'text', required: true },
              { id: 'profitSharing', text: 'Profit Sharing Terms', type: 'textarea', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'sales-agreement',
            name: 'Sales Agreement',
            description: 'Product or asset sale contract',
            icon: '🚗',
            questions: [
              { id: 'sellerName', text: 'Seller Name', type: 'text', required: true },
              { id: 'buyerName', text: 'Buyer Name', type: 'text', required: true },
              { id: 'itemDescription', text: 'Item Description', type: 'textarea', required: true },
              { id: 'salePrice', text: 'Sale Price', type: 'number', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'loan-agreement',
            name: 'Loan Agreement',
            description: 'Personal or business loan contract',
            icon: '💰',
            questions: [
              { id: 'lenderName', text: 'Lender Name', type: 'text', required: true },
              { id: 'borrowerName', text: 'Borrower Name', type: 'text', required: true },
              { id: 'loanAmount', text: 'Loan Amount', type: 'number', required: true },
              { id: 'interestRate', text: 'Interest Rate (%)', type: 'number', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'freelance-contract',
            name: 'Freelance Contract',
            description: 'Independent contractor agreement',
            icon: '💼',
            questions: [
              { id: 'freelancerName', text: 'Freelancer Name', type: 'text', required: true },
              { id: 'clientCompany', text: 'Client Company', type: 'text', required: true },
              { id: 'projectScope', text: 'Project Scope', type: 'textarea', required: true },
              { id: 'hourlyRate', text: 'Hourly Rate', type: 'number', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'power-of-attorney',
            name: 'Power of Attorney',
            description: 'Legal authority delegation document',
            icon: '⚖️',
            questions: [
              { id: 'principalName', text: 'Principal Name', type: 'text', required: true },
              { id: 'agentName', text: 'Agent Name', type: 'text', required: true },
              { id: 'authorityScope', text: 'Authority Scope', type: 'textarea', required: true },
              { id: 'effectiveDate', text: 'Effective Date', type: 'date', required: true }
            ],
            signatureRequired: 'single'
          },
          {
            id: 'will-testament',
            name: 'Will & Testament',
            description: 'Last will and testament document',
            icon: '📋',
            questions: [
              { id: 'testatorName', text: 'Testator Name', type: 'text', required: true },
              { id: 'executorName', text: 'Executor Name', type: 'text', required: true },
              { id: 'beneficiaries', text: 'Beneficiaries', type: 'textarea', required: true },
              { id: 'assetDistribution', text: 'Asset Distribution', type: 'textarea', required: true }
            ],
            signatureRequired: 'single'
          },
          {
            id: 'consulting-agreement',
            name: 'Consulting Agreement',
            description: 'Professional consulting services contract',
            icon: '👤',
            questions: [
              { id: 'consultantName', text: 'Consultant Name', type: 'text', required: true },
              { id: 'clientCompanyName', text: 'Client Company', type: 'text', required: true },
              { id: 'consultingServices', text: 'Consulting Services', type: 'textarea', required: true },
              { id: 'consultingFee', text: 'Consulting Fee', type: 'number', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'licensing-agreement',
            name: 'Licensing Agreement',
            description: 'Intellectual property licensing contract',
            icon: '🌐',
            questions: [
              { id: 'licensorName', text: 'Licensor Name', type: 'text', required: true },
              { id: 'licenseeName', text: 'Licensee Name', type: 'text', required: true },
              { id: 'intellectualProperty', text: 'Intellectual Property', type: 'textarea', required: true },
              { id: 'royaltyRate', text: 'Royalty Rate (%)', type: 'number', required: true }
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
      '📄': <FileText className="h-8 w-8 text-white" />,
      '🔒': <Shield className="h-8 w-8 text-white" />,
      '👥': <Users className="h-8 w-8 text-white" />,
      '🏢': <Building className="h-8 w-8 text-white" />,
      '❤️': <Heart className="h-8 w-8 text-white" />,
      '🚗': <Car className="h-8 w-8 text-white" />,
      '🏠': <Home className="h-8 w-8 text-white" />,
      '💼': <Briefcase className="h-8 w-8 text-white" />,
      '⚖️': <Scale className="h-8 w-8 text-white" />,
      '📋': <FileCheck className="h-8 w-8 text-white" />,
      '👤': <UserCheck className="h-8 w-8 text-white" />,
      '🌐': <Globe className="h-8 w-8 text-white" />,
      '💰': <FileText className="h-8 w-8 text-white" />
    };
    
    return iconMap[iconName] || <FileText className="h-8 w-8 text-white" />;
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documentTypes.map((doc) => (
          <Card 
            key={doc.id} 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-slate-900 border-slate-700 text-white relative overflow-hidden h-[280px] flex flex-col"
            onClick={() => onSelect(doc)}
          >
            <CardHeader className="text-center pb-4 relative z-10 flex-1">
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  {getIcon(doc.icon)}
                </div>
              </div>
              <CardTitle className="text-lg mb-2 text-white font-semibold">{doc.name}</CardTitle>
              <CardDescription className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                {doc.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 relative z-10 mt-auto">
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all shadow-lg border-0"
                onClick={() => onSelect(doc)}
              >
                Get Started
              </Button>
            </CardContent>
            
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Card>
        ))}
      </div>
    </div>
  );
};
