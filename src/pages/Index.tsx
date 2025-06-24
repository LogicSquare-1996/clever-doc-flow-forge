
import { useState } from 'react';
import { DocumentTypeSelector } from '@/components/DocumentTypeSelector';
import { DocumentForm } from '@/components/DocumentForm';
import { SignatureSection } from '@/components/SignatureSection';
import { DocumentPreview } from '@/components/DocumentPreview';
import { AuthModal } from '@/components/AuthModal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
  signatureRequired: 'single' | 'dual' | 'none';
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  options?: string[];
  required: boolean;
}

export interface FormData {
  [key: string]: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'select' | 'form' | 'signature' | 'preview'>('select');
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [signatures, setSignatures] = useState<{ [key: string]: string }>({});
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleDocumentSelect = (document: DocumentType) => {
    setSelectedDocument(document);
    setCurrentStep('form');
  };

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    if (selectedDocument?.signatureRequired !== 'none') {
      setCurrentStep('signature');
    } else {
      generateDocument(data, {});
    }
  };

  const handleSignatureComplete = (sigs: { [key: string]: string }) => {
    setSignatures(sigs);
    generateDocument(formData, sigs);
  };

  const generateDocument = async (data: FormData, sigs: { [key: string]: string }) => {
    // Mock document generation - in real app, this would call your backend
    setGeneratedDocument("This is a mock generated document content...");
    setCurrentStep('preview');
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      // Trigger download
      console.log('Downloading document...');
    }
  };

  const resetFlow = () => {
    setCurrentStep('select');
    setSelectedDocument(null);
    setFormData({});
    setSignatures({});
    setGeneratedDocument(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <Header isAuthenticated={isAuthenticated} onAuthClick={() => setShowAuthModal(true)} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentStep === 'select' && (
          <DocumentTypeSelector onSelect={handleDocumentSelect} />
        )}
        
        {currentStep === 'form' && selectedDocument && (
          <DocumentForm 
            document={selectedDocument}
            onComplete={handleFormComplete}
            onBack={resetFlow}
          />
        )}
        
        {currentStep === 'signature' && selectedDocument && (
          <SignatureSection
            documentType={selectedDocument}
            onComplete={handleSignatureComplete}
            onBack={() => setCurrentStep('form')}
          />
        )}
        
        {currentStep === 'preview' && generatedDocument && (
          <DocumentPreview
            content={generatedDocument}
            onDownload={handleDownload}
            onBack={resetFlow}
            isAuthenticated={isAuthenticated}
          />
        )}
      </main>

      <Footer />
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setIsAuthenticated(true);
            setShowAuthModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;
