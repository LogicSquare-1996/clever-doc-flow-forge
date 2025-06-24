
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DocumentType, FormData } from '@/pages/Index';

interface DocumentFormProps {
  document: DocumentType;
  onComplete: (data: FormData) => void;
  onBack: () => void;
}

export const DocumentForm = ({ document, onComplete, onBack }: DocumentFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentQuestion = document.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / document.questions.length) * 100;

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    
    if (errors[currentQuestion.id]) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: '' }));
    }
  };

  const validateCurrentQuestion = () => {
    if (currentQuestion.required && !formData[currentQuestion.id]?.trim()) {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.id]: 'This field is required'
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentQuestion()) return;

    if (currentQuestionIndex < document.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const renderInput = () => {
    const value = formData[currentQuestion.id] || '';
    
    switch (currentQuestion.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter ${currentQuestion.text.toLowerCase()}`}
            className="min-h-32"
          />
        );
      
      case 'select':
        return (
          <Select value={value} onValueChange={handleInputChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${currentQuestion.text.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter ${currentQuestion.text.toLowerCase()}`}
          />
        );
      
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Enter ${currentQuestion.text.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{document.name}</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {document.questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQuestion.text}
            {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor={currentQuestion.id}>{currentQuestion.text}</Label>
            {renderInput()}
            {errors[currentQuestion.id] && (
              <p className="text-sm text-red-500 mt-1">{errors[currentQuestion.id]}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{currentQuestionIndex === 0 ? 'Back to Selection' : 'Previous'}</span>
        </Button>

        <Button onClick={handleNext} className="flex items-center space-x-2">
          <span>{currentQuestionIndex === document.questions.length - 1 ? 'Continue to Signature' : 'Next'}</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Question navigation dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {document.questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentQuestionIndex
                ? 'bg-blue-600'
                : index < currentQuestionIndex
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
