import { useState } from 'react';
import { DocumentTypeSelector } from '@/components/DocumentTypeSelector';
import { DocumentForm } from '@/components/DocumentForm';
import { SignatureSection } from '@/components/SignatureSection';
import { DocumentPreview } from '@/components/DocumentPreview';
import { AuthModal } from '@/components/AuthModal';
import { PaymentModal } from '@/components/PaymentModal';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasDocumentAccess, setHasDocumentAccess] = useState(false);
  const { toast } = useToast();

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
    if (!selectedDocument) return;
    
    setIsGenerating(true);
    
    try {
      // Step 1: Generate sophisticated prompt using Gemini API
      console.log('Generating sophisticated prompt...');
      const promptResponse = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType: selectedDocument.name,
          documentDescription: selectedDocument.description,
          questions: selectedDocument.questions,
          answers: data,
          signatureRequired: selectedDocument.signatureRequired
        }),
      });

      if (!promptResponse.ok) {
        throw new Error('Failed to generate sophisticated prompt');
      }

      const { prompt } = await promptResponse.json();
      console.log('Sophisticated prompt generated:', prompt);

      // Step 2: Generate document using the sophisticated prompt via Gemini API
      console.log('Generating document with sophisticated prompt...');
      const documentResponse = await fetch('/api/generate-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sophisticatedPrompt: prompt,
          documentType: selectedDocument.name,
          formData: data,
          signatures: sigs,
          documentMetadata: {
            id: selectedDocument.id,
            name: selectedDocument.name,
            description: selectedDocument.description,
            signatureRequired: selectedDocument.signatureRequired
          }
        }),
      });

      if (!documentResponse.ok) {
        throw new Error('Failed to generate document with Gemini API');
      }

      const { document, documentId } = await documentResponse.json();
      console.log('Document generated successfully:', { documentId, document });
      
      setGeneratedDocument(document);
      setCurrentStep('preview');
      
      // Check if user has access (either authenticated with subscription or has purchased this document)
      // For now, we'll assume they need to pay unless they're subscribed
      setHasDocumentAccess(false);
      
      toast({
        title: "Document Generated Successfully",
        description: `Your ${selectedDocument.name} has been created using advanced AI technology.`,
      });
      
    } catch (error) {
      console.error('Document generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate document. Please try again.",
        variant: "destructive",
      });
      
      // Fallback for development/testing
      const fallbackDoc = `# ${selectedDocument.name}\n\n**Generated on:** ${new Date().toLocaleDateString()}\n\n## Document Details\n\n${Object.entries(data).map(([key, value]) => `**${key}:** ${value}`).join('\n')}\n\n---\n\n*This document was generated using DocuGen AI technology.*`;
      setGeneratedDocument(fallbackDoc);
      setCurrentStep('preview');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else if (!hasDocumentAccess) {
      setShowPaymentModal(true);
    } else {
      // Trigger download
      console.log('Downloading document...');
      toast({
        title: "Download Started",
        description: "Your document is being prepared for download.",
      });
    }
  };

  const handlePaymentRequired = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async (type: 'single' | 'subscription', planType?: string) => {
    try {
      if (type === 'single') {
        // Handle single document purchase
        console.log('Processing single document purchase...');
        toast({
          title: "Processing Payment",
          description: "Redirecting to secure payment page...",
        });
        
        // Simulate payment success for demo
        setTimeout(() => {
          setHasDocumentAccess(true);
          setShowPaymentModal(false);
          toast({
            title: "Payment Successful",
            description: "You now have access to download this document!",
          });
        }, 2000);
      } else {
        // Handle subscription
        console.log(`Processing ${planType} subscription...`);
        toast({
          title: "Processing Subscription",
          description: `Setting up your ${planType} plan...`,
        });
        
        // Simulate subscription success for demo
        setTimeout(() => {
          setHasDocumentAccess(true);
          setShowPaymentModal(false);
          toast({
            title: "Subscription Active",
            description: `Welcome to DocuGen ${planType}! You now have unlimited access.`,
          });
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 flex flex-col transition-colors">
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
            isGenerating={isGenerating}
            onPaymentRequired={handlePaymentRequired}
            hasAccess={hasDocumentAccess}
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

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          documentName={selectedDocument?.name}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
};

export default Index;
