import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2, FileText, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DocumentType, Question } from './Index';

interface DocumentTypeForm {
  name: string;
  description: string;
  icon: string;
  signatureRequired: 'single' | 'dual' | 'none';
  questions: Question[];
}

const mockDocumentTypes: DocumentType[] = [
  {
    id: '1',
    name: 'NDA',
    description: 'Non-Disclosure Agreement',
    icon: 'lock',
    questions: [
      { id: '1', text: 'Company Name', type: 'text', required: true },
      { id: '2', text: 'Counterparty Name', type: 'text', required: true },
    ],
    signatureRequired: 'single',
  },
  {
    id: '2',
    name: 'Employment Agreement',
    description: 'Agreement for new employees',
    icon: 'user',
    questions: [
      { id: '3', text: 'Employee Name', type: 'text', required: true },
      { id: '4', text: 'Job Title', type: 'text', required: true },
    ],
    signatureRequired: 'dual',
  },
];

const Admin = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>(mockDocumentTypes);
  const [showForm, setShowForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [formValues, setFormValues] = useState<DocumentTypeForm>({
    name: '',
    description: '',
    icon: '',
    signatureRequired: 'none',
    questions: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAddDocumentType = () => {
    setSelectedDocument(null);
    setFormValues({
      name: '',
      description: '',
      icon: '',
      signatureRequired: 'none',
      questions: [],
    });
    setShowForm(true);
  };

  const handleEditDocumentType = (documentType: DocumentType) => {
    setSelectedDocument(documentType);
    setFormValues({
      name: documentType.name,
      description: documentType.description,
      icon: documentType.icon,
      signatureRequired: documentType.signatureRequired,
      questions: documentType.questions,
    });
    setShowForm(true);
  };

  const handleDeleteDocumentType = (id: string) => {
    setDocumentTypes(documentTypes.filter((doc) => doc.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDocument) {
      // Update existing document type
      setDocumentTypes(
        documentTypes.map((doc) =>
          doc.id === selectedDocument.id ? { ...doc, ...formValues } : doc
        )
      );
    } else {
      // Create new document type (in real app, generate a unique ID)
      const newDocumentType: DocumentType = {
        id: String(Date.now()),
        ...formValues,
      };
      setDocumentTypes([...documentTypes, newDocumentType]);
    }
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-purple-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                DocuGen AI - Admin
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to App</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Document Types
          </h2>
          <Button onClick={handleAddDocumentType}>
            <Plus className="h-4 w-4 mr-2" />
            Add Document Type
          </Button>
        </div>

        {/* Document Type List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentTypes.map((documentType) => (
            <Card key={documentType.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {documentType.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {documentType.description}
              </p>
              <div className="flex justify-end mt-4 space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleEditDocumentType(documentType)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteDocumentType(documentType.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-900">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {selectedDocument ? 'Edit Document Type' : 'Add Document Type'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formValues.icon}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signatureRequired">Signature Required</Label>
                  <select
                    id="signatureRequired"
                    name="signatureRequired"
                    value={formValues.signatureRequired}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                  >
                    <option value="none">None</option>
                    <option value="single">Single</option>
                    <option value="dual">Dual</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedDocument ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
