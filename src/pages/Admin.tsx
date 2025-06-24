
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { DocumentType, Question } from './Index';

// Mock admin credentials
const ADMIN_EMAIL = 'admin@docugen.ai';
const ADMIN_PASSWORD = 'DocuGen2024!';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [editingDocument, setEditingDocument] = useState<DocumentType | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use: admin@docugen.ai / DocuGen2024!');
    }
  };

  const handleAddDocument = () => {
    const newDocument: DocumentType = {
      id: `doc-${Date.now()}`,
      name: '',
      description: '',
      icon: 'filetext',
      signatureRequired: 'none',
      questions: []
    };
    setEditingDocument(newDocument);
    setShowAddForm(true);
  };

  const handleSaveDocument = () => {
    if (editingDocument) {
      if (showAddForm) {
        setDocumentTypes([...documentTypes, editingDocument]);
      } else {
        setDocumentTypes(documentTypes.map(doc => 
          doc.id === editingDocument.id ? editingDocument : doc
        ));
      }
      setEditingDocument(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocumentTypes(documentTypes.filter(doc => doc.id !== id));
  };

  const handleAddQuestion = () => {
    if (editingDocument) {
      const newQuestion: Question = {
        id: `q-${Date.now()}`,
        text: '',
        type: 'text',
        required: true
      };
      setEditingDocument({
        ...editingDocument,
        questions: [...editingDocument.questions, newQuestion]
      });
    }
  };

  const handleUpdateQuestion = (questionId: string, field: keyof Question, value: any) => {
    if (editingDocument) {
      setEditingDocument({
        ...editingDocument,
        questions: editingDocument.questions.map(q =>
          q.id === questionId ? { ...q, [field]: value } : q
        )
      });
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (editingDocument) {
      setEditingDocument({
        ...editingDocument,
        questions: editingDocument.questions.filter(q => q.id !== questionId)
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your admin credentials to access the dashboard
            </CardDescription>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm">
              <p className="font-semibold text-gray-700">Demo Credentials:</p>
              <p className="text-gray-600">Email: admin@docugen.ai</p>
              <p className="text-gray-600">Password: DocuGen2024!</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@docugen.ai"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Document Types Management</h2>
          <Button 
            onClick={handleAddDocument}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Document Type
          </Button>
        </div>

        {(editingDocument && showAddForm) && (
          <Card className="mb-8 border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Add New Document Type
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setEditingDocument(null);
                    setShowAddForm(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Document Name</Label>
                  <Input
                    id="name"
                    value={editingDocument.name}
                    onChange={(e) => setEditingDocument({...editingDocument, name: e.target.value})}
                    placeholder="e.g., Employment Contract"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={editingDocument.icon} onValueChange={(value) => setEditingDocument({...editingDocument, icon: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filetext">File Text</SelectItem>
                      <SelectItem value="building">Building</SelectItem>
                      <SelectItem value="briefcase">Briefcase</SelectItem>
                      <SelectItem value="shield">Shield</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="receipt">Receipt</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="handshake">Handshake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingDocument.description}
                  onChange={(e) => setEditingDocument({...editingDocument, description: e.target.value})}
                  placeholder="Brief description of the document type"
                />
              </div>

              <div>
                <Label htmlFor="signature">Signature Requirement</Label>
                <Select value={editingDocument.signatureRequired} onValueChange={(value: 'single' | 'dual' | 'none') => setEditingDocument({...editingDocument, signatureRequired: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Signature</SelectItem>
                    <SelectItem value="single">Single Signature</SelectItem>
                    <SelectItem value="dual">Dual Signature</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Questions</Label>
                  <Button onClick={handleAddQuestion} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {editingDocument.questions.map((question, index) => (
                    <Card key={question.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label>Question Text</Label>
                          <Input
                            value={question.text}
                            onChange={(e) => handleUpdateQuestion(question.id, 'text', e.target.value)}
                            placeholder="Enter question text"
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Select value={question.type} onValueChange={(value) => handleUpdateQuestion(question.id, 'type', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={question.required}
                            onChange={(e) => handleUpdateQuestion(question.id, 'required', e.target.checked)}
                          />
                          <span className="text-sm">Required</span>
                        </label>
                        <Button 
                          onClick={() => handleDeleteQuestion(question.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setEditingDocument(null);
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveDocument}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Document Type
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentTypes.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{doc.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => setEditingDocument(doc)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{doc.description}</CardDescription>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{doc.questions.length} questions</span>
                  <span>{doc.signatureRequired} signature</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {documentTypes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No document types added yet.</p>
            <p className="text-gray-400">Click "Add Document Type" to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
