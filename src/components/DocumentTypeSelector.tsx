
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Handshake, Shield, Users, Receipt, Building, Briefcase, Presentation } from 'lucide-react';
import { DocumentType } from '@/pages/Index';

const documentTypes: DocumentType[] = [
  {
    id: 'rent-agreement',
    name: 'Rent Agreement',
    description: 'Comprehensive rental agreements for residential and commercial properties',
    icon: 'building',
    signatureRequired: 'dual',
    questions: [
      { id: 'landlord_name', text: 'Landlord Full Name', type: 'text', required: true },
      { id: 'tenant_name', text: 'Tenant Full Name', type: 'text', required: true },
      { id: 'property_address', text: 'Property Address', type: 'textarea', required: true },
      { id: 'rent_amount', text: 'Monthly Rent Amount', type: 'number', required: true },
      { id: 'lease_duration', text: 'Lease Duration (months)', type: 'number', required: true },
      { id: 'security_deposit', text: 'Security Deposit Amount', type: 'number', required: true },
    ]
  },
  {
    id: 'offer-letter',
    name: 'Offer Letter',
    description: 'Professional job offer letters with compensation details',
    icon: 'briefcase',
    signatureRequired: 'single',
    questions: [
      { id: 'candidate_name', text: 'Candidate Full Name', type: 'text', required: true },
      { id: 'position', text: 'Job Position', type: 'text', required: true },
      { id: 'salary', text: 'Annual Salary', type: 'number', required: true },
      { id: 'start_date', text: 'Start Date', type: 'date', required: true },
      { id: 'company_name', text: 'Company Name', type: 'text', required: true },
      { id: 'benefits', text: 'Benefits Package', type: 'textarea', required: false },
    ]
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    description: 'Protect confidential information with professional NDAs',
    icon: 'shield',
    signatureRequired: 'dual',
    questions: [
      { id: 'disclosing_party', text: 'Disclosing Party Name', type: 'text', required: true },
      { id: 'receiving_party', text: 'Receiving Party Name', type: 'text', required: true },
      { id: 'purpose', text: 'Purpose of Disclosure', type: 'textarea', required: true },
      { id: 'duration', text: 'Agreement Duration (years)', type: 'number', required: true },
      { id: 'jurisdiction', text: 'Governing Jurisdiction', type: 'text', required: true },
    ]
  },
  {
    id: 'founders-agreement',
    name: "Founders' Agreement",
    description: 'Establish clear terms between startup co-founders',
    icon: 'users',
    signatureRequired: 'dual',
    questions: [
      { id: 'company_name', text: 'Company Name', type: 'text', required: true },
      { id: 'founder1_name', text: 'First Founder Name', type: 'text', required: true },
      { id: 'founder2_name', text: 'Second Founder Name', type: 'text', required: true },
      { id: 'founder1_equity', text: 'First Founder Equity %', type: 'number', required: true },
      { id: 'founder2_equity', text: 'Second Founder Equity %', type: 'number', required: true },
      { id: 'vesting_period', text: 'Vesting Period (years)', type: 'number', required: true },
    ]
  },
  {
    id: 'employment-contract',
    name: 'Employment Contract',
    description: 'Detailed employment contracts with terms and conditions',
    icon: 'filetext',
    signatureRequired: 'dual',
    questions: [
      { id: 'employee_name', text: 'Employee Full Name', type: 'text', required: true },
      { id: 'employer_name', text: 'Employer/Company Name', type: 'text', required: true },
      { id: 'job_title', text: 'Job Title', type: 'text', required: true },
      { id: 'salary', text: 'Annual Salary', type: 'number', required: true },
      { id: 'work_hours', text: 'Weekly Work Hours', type: 'number', required: true },
      { id: 'probation_period', text: 'Probation Period (months)', type: 'number', required: false },
    ]
  },
  {
    id: 'freelance-invoice',
    name: 'Freelance Invoice',
    description: 'Professional invoices for freelance services',
    icon: 'receipt',
    signatureRequired: 'none',
    questions: [
      { id: 'freelancer_name', text: 'Freelancer Name', type: 'text', required: true },
      { id: 'client_name', text: 'Client Name', type: 'text', required: true },
      { id: 'service_description', text: 'Service Description', type: 'textarea', required: true },
      { id: 'amount', text: 'Total Amount', type: 'number', required: true },
      { id: 'due_date', text: 'Payment Due Date', type: 'date', required: true },
      { id: 'invoice_number', text: 'Invoice Number', type: 'text', required: true },
    ]
  },
  {
    id: 'pitch-deck',
    name: 'Pitch Deck Outline',
    description: 'Basic structure and content outline for investor pitch decks',
    icon: 'presentation',
    signatureRequired: 'none',
    questions: [
      { id: 'company_name', text: 'Company Name', type: 'text', required: true },
      { id: 'problem_statement', text: 'Problem Statement', type: 'textarea', required: true },
      { id: 'solution', text: 'Solution Description', type: 'textarea', required: true },
      { id: 'market_size', text: 'Target Market Size', type: 'text', required: true },
      { id: 'business_model', text: 'Business Model', type: 'textarea', required: true },
      { id: 'funding_amount', text: 'Funding Amount Needed', type: 'number', required: true },
    ]
  },
  {
    id: 'gst-support',
    name: 'GST Registration Support',
    description: 'Supporting documents and forms for GST registration',
    icon: 'building',
    signatureRequired: 'single',
    questions: [
      { id: 'business_name', text: 'Business Name', type: 'text', required: true },
      { id: 'business_type', text: 'Business Type', type: 'select', options: ['Proprietorship', 'Partnership', 'Private Limited', 'Public Limited'], required: true },
      { id: 'business_address', text: 'Business Address', type: 'textarea', required: true },
      { id: 'pan_number', text: 'PAN Number', type: 'text', required: true },
      { id: 'annual_turnover', text: 'Expected Annual Turnover', type: 'number', required: true },
      { id: 'business_description', text: 'Business Activity Description', type: 'textarea', required: true },
    ]
  },
];

const iconMap = {
  building: Building,
  briefcase: Briefcase,
  shield: Shield,
  users: Users,
  filetext: FileText,
  receipt: Receipt,
  presentation: Presentation,
  handshake: Handshake,
};

interface DocumentTypeSelectorProps {
  onSelect: (document: DocumentType) => void;
}

export const DocumentTypeSelector = ({ onSelect }: DocumentTypeSelectorProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Document Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create professional, legally compliant documents in minutes. Choose from our comprehensive 
          collection of templates and let AI customize them for your specific needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {documentTypes.map((doc) => {
          const IconComponent = iconMap[doc.icon as keyof typeof iconMap] || FileText;
          
          return (
            <Card 
              key={doc.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border-2 hover:border-blue-300"
              onClick={() => onSelect(doc)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{doc.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {doc.description}
                </CardDescription>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {doc.questions.length} questions
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {doc.signatureRequired === 'dual' ? '2 Signatures' : 
                     doc.signatureRequired === 'single' ? '1 Signature' : 'No Signature'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
