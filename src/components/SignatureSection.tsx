
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Upload, Pen, Trash2 } from 'lucide-react';
import { DocumentType } from '@/pages/Index';

interface SignatureSectionProps {
  documentType: DocumentType;
  onComplete: (signatures: { [key: string]: string }) => void;
  onBack: () => void;
}

export const SignatureSection = ({ documentType, onComplete, onBack }: SignatureSectionProps) => {
  const [signatures, setSignatures] = useState<{ [key: string]: string }>({});
  const [activeSignature, setActiveSignature] = useState<string>('party1');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const signatureParties = documentType.signatureRequired === 'dual' 
    ? ['party1', 'party2'] 
    : ['party1'];

  const partyLabels = {
    party1: documentType.signatureRequired === 'dual' ? 'First Party Signature' : 'Your Signature',
    party2: 'Second Party Signature'
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setSignatures(prev => ({
        ...prev,
        [activeSignature]: dataURL
      }));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignatures(prev => ({
      ...prev,
      [activeSignature]: ''
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSignatures(prev => ({
          ...prev,
          [activeSignature]: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    const requiredSignatures = signatureParties.filter(party => 
      !signatures[party] || signatures[party].trim() === ''
    );

    if (requiredSignatures.length > 0) {
      alert('Please provide all required signatures before proceeding.');
      return;
    }

    onComplete(signatures);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Signatures</h2>
        <p className="text-gray-600">
          {documentType.signatureRequired === 'dual' 
            ? 'This document requires signatures from both parties.' 
            : 'Please provide your signature to complete the document.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Signature Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pen className="h-5 w-5" />
              <span>{partyLabels[activeSignature as keyof typeof partyLabels]}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="draw" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="draw">Draw Signature</TabsTrigger>
                <TabsTrigger value="upload">Upload Image</TabsTrigger>
              </TabsList>
              
              <TabsContent value="draw" className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    className="w-full border bg-white rounded cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">Draw your signature above</p>
                    <Button variant="outline" size="sm" onClick={clearCanvas}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <Label htmlFor="signature-upload" className="cursor-pointer">
                    <div className="text-lg font-medium text-gray-700 mb-2">
                      Upload Signature Image
                    </div>
                    <p className="text-sm text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                    <Input
                      id="signature-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button variant="outline" className="mt-4">
                      Choose File
                    </Button>
                  </Label>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Signature Preview and Party Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Signature Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Party Selection for dual signatures */}
            {documentType.signatureRequired === 'dual' && (
              <div className="space-y-2">
                <Label>Select signatory:</Label>
                <div className="flex space-x-2">
                  {signatureParties.map((party) => (
                    <Button
                      key={party}
                      variant={activeSignature === party ? 'default' : 'outline'}
                      onClick={() => setActiveSignature(party)}
                      className="flex-1"
                    >
                      {partyLabels[party as keyof typeof partyLabels]}
                      {signatures[party] && <span className="ml-2 text-green-500">✓</span>}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Current Signature Preview */}
            <div className="border rounded-lg p-4 bg-gray-50 min-h-32 flex items-center justify-center">
              {signatures[activeSignature] ? (
                <img 
                  src={signatures[activeSignature]} 
                  alt="Signature preview" 
                  className="max-h-24 max-w-full object-contain"
                />
              ) : (
                <p className="text-gray-500">No signature provided</p>
              )}
            </div>

            {/* All Signatures Status */}
            <div className="space-y-2">
              <Label>Signature Status:</Label>
              {signatureParties.map((party) => (
                <div key={party} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{partyLabels[party as keyof typeof partyLabels]}</span>
                  <span className={`text-sm font-medium ${signatures[party] ? 'text-green-600' : 'text-red-600'}`}>
                    {signatures[party] ? 'Complete' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Form</span>
        </Button>

        <Button onClick={handleComplete} className="px-8">
          Generate Document
        </Button>
      </div>
    </div>
  );
};
