import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, FileText, ArrowLeft, BarChart3, Settings, X, User } from 'lucide-react';
import { FaHome, FaBriefcase, FaShieldAlt, FaUsers, FaFileContract, FaCalculator, FaChartLine, FaFileInvoiceDollar } from 'react-icons/fa';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DocumentType, Question } from './Index';
import AdminDashboard from '@/components/AdminDashboard';

interface DocumentTypeForm {
  name: string;
  description: string;
  icon: string;
  price: string;
  category: string;
  signatureRequired: 'single' | 'dual' | 'none';
  questions: Question[];
}

const mockDocumentTypes: DocumentType[] = [
  {
    id: '1',
    name: 'NDA',
    description: 'Non-Disclosure Agreement',
    icon: 'FaShieldAlt',
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
    icon: 'FaBriefcase',
    questions: [
      { id: '3', text: 'Employee Name', type: 'text', required: true },
      { id: '4', text: 'Job Title', type: 'text', required: true },
    ],
    signatureRequired: 'dual',
  },
];

// Available icons for document types
const availableIcons = [
  { name: 'FaHome', icon: FaHome, label: 'Rent Agreement' },
  { name: 'FaBriefcase', icon: FaBriefcase, label: 'Offer Letter' },
  { name: 'FaShieldAlt', icon: FaShieldAlt, label: 'Non-Disclosure Agreement' },
  { name: 'FaUsers', icon: FaUsers, label: 'Founders Agreement' },
  { name: 'FaFileContract', icon: FaFileContract, label: 'Employment Contract' },
  { name: 'FaCalculator', icon: FaCalculator, label: 'Freelance Invoice' },
  { name: 'FaChartLine', icon: FaChartLine, label: 'Pitch Deck Outline' },
  { name: 'FaFileInvoiceDollar', icon: FaFileInvoiceDollar, label: 'GST Registration Support' },
];

const Admin = () => {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>(mockDocumentTypes);
  const [showForm, setShowForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [formValues, setFormValues] = useState<DocumentTypeForm>({
    name: '',
    description: '',
    icon: '',
    price: '',
    category: '',
    signatureRequired: 'none',
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'text' as 'text' | 'textarea' | 'select' | 'date' | 'number',
    required: false,
    options: [] as string[]
  });

  const handleInputChange = (field: string, value: any) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleAddQuestion = () => {
    if (newQuestion.text.trim()) {
      const question: Question = {
        id: Date.now().toString(),
        text: newQuestion.text,
        type: newQuestion.type,
        required: newQuestion.required,
        options: newQuestion.type === 'select' ? newQuestion.options : undefined
      };
      
      setFormValues({
        ...formValues,
        questions: [...formValues.questions, question]
      });
      
      setNewQuestion({
        text: '',
        type: 'text',
        required: false,
        options: []
      });
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setFormValues({
      ...formValues,
      questions: formValues.questions.filter(q => q.id !== questionId)
    });
  };

  const handleAddDocumentType = () => {
    setSelectedDocument(null);
    setFormValues({
      name: '',
      description: '',
      icon: '',
      price: '',
      category: '',
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
      price: '',
      category: '',
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
      setDocumentTypes(
        documentTypes.map((doc) =>
          doc.id === selectedDocument.id ? { ...doc, ...formValues } : doc
        )
      );
    } else {
      const newDocumentType: DocumentType = {
        id: String(Date.now()),
        ...formValues,
      };
      setDocumentTypes([...documentTypes, newDocumentType]);
    }
    setShowForm(false);
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  // Admin user data
  const adminInfo = {
    name: 'Admin User',
    email: 'admin@docugen.ai',
    planType: 'ADMIN',
    joinDate: '2023-01-01',
    avatar: 'A'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-purple-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                DocuGen
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
        {/* Welcome Section with Admin Profile */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white mb-6">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100 mb-4">Welcome back, {adminInfo.name}</p>
            
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {adminInfo.avatar}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{adminInfo.name}</h2>
                <p className="text-purple-100">{adminInfo.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {adminInfo.planType}
                  </span>
                  <span className="text-purple-100 text-sm">Admin since {adminInfo.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Manage Documents</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Admin Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="documents">
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
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Admin Profile Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
                      <Input id="firstName" defaultValue="Admin" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                      <Input id="lastName" defaultValue="User" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@docugen.ai" />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-700 dark:text-gray-300">Organization</Label>
                    <Input id="company" defaultValue="DocuGen AI" />
                  </div>
                  <Button className="w-full">Update Profile</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-gray-700 dark:text-gray-300">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="text-gray-700 dark:text-gray-300">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="w-full">Change Password</Button>
                  <hr className="my-4" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Admin Privileges</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You have full administrative access to manage document types, users, and system settings.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Form Modal - Keep existing code */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-4 mx-auto p-6 border w-full max-w-4xl shadow-lg rounded-lg bg-white dark:bg-gray-900 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {selectedDocument ? 'Edit Document Type' : 'Add New Document Type'}
                </h3>
                <Button variant="ghost" onClick={() => setShowForm(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      value={formValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3"
                      placeholder="Enter document title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">Price</Label>
                    <Input
                      type="text"
                      id="price"
                      value={formValues.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3"
                      placeholder="Free"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">Description</Label>
                  <Textarea
                    id="description"
                    value={formValues.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3"
                    placeholder="Enter document description"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">Category</Label>
                    <Select value={formValues.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 px-4 py-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="employment">Employment</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Icon Selection */}
                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Select Icon</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {availableIcons.map((iconItem) => {
                      const IconComponent = iconItem.icon;
                      return (
                        <div
                          key={iconItem.name}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-400 ${
                            formValues.icon === iconItem.name
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
                          }`}
                          onClick={() => handleInputChange('icon', iconItem.name)}
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xs text-center text-gray-600 dark:text-gray-400">
                              {iconItem.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Signature Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Switch 
                        checked={formValues.signatureRequired === 'single'}
                        onCheckedChange={(checked) => handleInputChange('signatureRequired', checked ? 'single' : 'none')}
                      />
                      <span className="text-gray-700 dark:text-gray-300">Requires Digital Signature</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch 
                        checked={formValues.signatureRequired === 'dual'}
                        onCheckedChange={(checked) => handleInputChange('signatureRequired', checked ? 'dual' : 'none')}
                      />
                      <span className="text-gray-700 dark:text-gray-300">Dual Party Signature (both parties sign)</span>
                    </div>
                  </div>
                </div>

                {/* Questions Section - Keep existing code */}
                <div className="space-y-4">
                  <Label className="text-gray-700 dark:text-gray-300">Questions</Label>
                  
                  {/* Add New Question Section */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Add New Question</h4>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-600 dark:text-gray-400">Question</Label>
                      <Input
                        value={newQuestion.text}
                        onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                        placeholder="Enter question text"
                        className="bg-white dark:bg-gray-700 px-4 py-3"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-600 dark:text-gray-400">Question Type</Label>
                        <Select value={newQuestion.type} onValueChange={(value: any) => setNewQuestion({...newQuestion, type: value})}>
                          <SelectTrigger className="bg-white dark:bg-gray-700 px-4 py-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="textarea">Text Area</SelectItem>
                            <SelectItem value="select">Select</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2 pt-6">
                        <Switch 
                          checked={newQuestion.required}
                          onCheckedChange={(checked) => setNewQuestion({...newQuestion, required: checked})}
                        />
                        <span className="text-gray-600 dark:text-gray-400">Required</span>
                      </div>
                    </div>

                    <Button type="button" onClick={handleAddQuestion} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>

                  {/* Questions List */}
                  {formValues.questions.length > 0 && (
                    <div className="space-y-2">
                      {formValues.questions.map((question, index) => (
                        <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">{question.text}</span>
                            <span className="ml-2 text-xs text-gray-500">({question.type})</span>
                            {question.required && <span className="ml-1 text-red-500">*</span>}
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveQuestion(question.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    {selectedDocument ? 'Update Document Type' : 'Create Document Type'}
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
