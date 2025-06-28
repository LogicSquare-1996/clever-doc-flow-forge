
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
            id: 'rent-agreement',
            name: 'Rent Agreement',
            description: 'Comprehensive rental agreements for residential and commercial properties',
            icon: 'building',
            questions: [
              { id: 'landlordName', text: 'Landlord Name', type: 'text', required: true },
              { id: 'tenantName', text: 'Tenant Name', type: 'text', required: true },
              { id: 'propertyAddress', text: 'Property Address', type: 'textarea', required: true },
              { id: 'monthlyRent', text: 'Monthly Rent', type: 'number', required: true },
              { id: 'leaseTerm', text: 'Lease Term', type: 'text', required: true },
              { id: 'securityDeposit', text: 'Security Deposit', type: 'number', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'offer-letter',
            name: 'Offer Letter',
            description: 'Professional job offer letters with compensation details',
            icon: 'briefcase',
            questions: [
              { id: 'candidateName', text: 'Candidate Name', type: 'text', required: true },
              { id: 'position', text: 'Job Position', type: 'text', required: true },
              { id: 'salary', text: 'Annual Salary', type: 'number', required: true },
              { id: 'startDate', text: 'Start Date', type: 'date', required: true },
              { id: 'reportingManager', text: 'Reporting Manager', type: 'text', required: true },
              { id: 'benefits', text: 'Benefits Package', type: 'textarea', required: true }
            ],
            signatureRequired: 'single'
          },
          {
            id: 'non-disclosure-agreement',
            name: 'Non-Disclosure Agreement',
            description: 'Protect confidential information with professional NDAs',
            icon: 'shield',
            questions: [
              { id: 'disclosingParty', text: 'Disclosing Party Name', type: 'text', required: true },
              { id: 'receivingParty', text: 'Receiving Party Name', type: 'text', required: true },
              { id: 'purposeDescription', text: 'Purpose Description', type: 'textarea', required: true },
              { id: 'duration', text: 'Agreement Duration', type: 'text', required: true },
              { id: 'effectiveDate', text: 'Effective Date', type: 'date', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'founders-agreement',
            name: "Founders' Agreement",
            description: 'Establish clear terms between startup co-founders',
            icon: 'users',
            questions: [
              { id: 'founder1Name', text: 'Founder 1 Name', type: 'text', required: true },
              { id: 'founder2Name', text: 'Founder 2 Name', type: 'text', required: true },
              { id: 'companyName', text: 'Company Name', type: 'text', required: true },
              { id: 'equityDistribution', text: 'Equity Distribution', type: 'textarea', required: true },
              { id: 'roles', text: 'Roles and Responsibilities', type: 'textarea', required: true },
              { id: 'vestingSchedule', text: 'Vesting Schedule', type: 'textarea', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'employment-contract',
            name: 'Employment Contract',
            description: 'Detailed employment contracts with terms and conditions',
            icon: 'file-text',
            questions: [
              { id: 'employeeName', text: 'Employee Full Name', type: 'text', required: true },
              { id: 'position', text: 'Job Position', type: 'text', required: true },
              { id: 'salary', text: 'Annual Salary', type: 'number', required: true },
              { id: 'workingHours', text: 'Working Hours', type: 'text', required: true },
              { id: 'probationPeriod', text: 'Probation Period', type: 'text', required: true },
              { id: 'benefits', text: 'Employee Benefits', type: 'textarea', required: true }
            ],
            signatureRequired: 'dual'
          },
          {
            id: 'freelance-invoice',
            name: 'Freelance Invoice',
            description: 'Professional invoices for freelance services',
            icon: 'file-check',
            questions: [
              { id: 'freelancerName', text: 'Freelancer Name', type: 'text', required: true },
              { id: 'clientName', text: 'Client Name', type: 'text', required: true },
              { id: 'serviceDescription', text: 'Service Description', type: 'textarea', required: true },
              { id: 'amount', text: 'Invoice Amount', type: 'number', required: true },
              { id: 'dueDate', text: 'Payment Due Date', type: 'date', required: true },
              { id: 'paymentTerms', text: 'Payment Terms', type: 'text', required: true }
            ],
            signatureRequired: 'none'
          },
          {
            id: 'pitch-deck-outline',
            name: 'Pitch Deck Outline',
            description: 'Basic structure and content outline for investor pitch decks',
            icon: 'presentation',
            questions: [
              { id: 'companyName', text: 'Company Name', type: 'text', required: true },
              { id: 'problemStatement', text: 'Problem Statement', type: 'textarea', required: true },
              { id: 'solution', text: 'Solution Description', type: 'textarea', required: true },
              { id: 'marketSize', text: 'Market Size', type: 'text', required: true },
              { id: 'businessModel', text: 'Business Model', type: 'textarea', required: true },
              { id: 'fundingAmount', text: 'Funding Amount Sought', type: 'number', required: true }
            ],
            signatureRequired: 'none'
          },
          {
            id: 'gst-registration-support',
            name: 'GST Registration Support',
            description: 'Supporting documents and forms for GST registration',
            icon: 'calculator',
            questions: [
              { id: 'businessName', text: 'Business Name', type: 'text', required: true },
              { id: 'businessType', text: 'Business Type', type: 'select', options: ['Proprietorship', 'Partnership', 'Private Limited', 'Public Limited'], required: true },
              { id: 'panNumber', text: 'PAN Number', type: 'text', required: true },
              { id: 'businessAddress', text: 'Business Address', type: 'textarea', required: true },
              { id: 'turnover', text: 'Expected Annual Turnover', type: 'number', required: true },
              { id: 'hsn', text: 'HSN/SAC Codes', type: 'textarea', required: true }
            ],
            signatureRequired: 'single'
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
      'building': <Building className="h-6 w-6" />,
      'briefcase': <Briefcase className="h-6 w-6" />,
      'shield': <Shield className="h-6 w-6" />,
      'users': <Users className="h-6 w-6" />,
      'file-text': <FileText className="h-6 w-6" />,
      'file-check': <FileCheck className="h-6 w-6" />,
      'presentation': <FileText className="h-6 w-6" />,
      'calculator': <Scale className="h-6 w-6" />
    };
    
    return iconMap[iconName] || <FileText className="h-6 w-6" />;
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
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 relative overflow-hidden"
            onClick={() => onSelect(doc)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-3 rounded-xl bg-purple-600 text-white flex-shrink-0">
                  {getIcon(doc.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-2 text-gray-900 dark:text-white font-semibold leading-tight">
                    {doc.name}
                  </CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {doc.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant="secondary" 
                  className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-0 text-xs px-3 py-1 rounded-full"
                >
                  {doc.questions.length} questions
                </Badge>
                
                <Badge 
                  variant="secondary" 
                  className={`border-0 text-xs px-3 py-1 rounded-full ${
                    doc.signatureRequired === 'dual' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                    doc.signatureRequired === 'single' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300' :
                    'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {doc.signatureRequired === 'dual' ? '2 Signatures' : 
                   doc.signatureRequired === 'single' ? '1 Signature' : 
                   'No Signature'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
