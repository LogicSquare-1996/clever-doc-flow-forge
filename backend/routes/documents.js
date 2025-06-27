
const express = require('express');
const Document = require('../models/Document');
const DocumentPurchase = require('../models/DocumentPurchase');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Document templates
const documentTemplates = [
  {
    id: 'employment-agreement',
    name: 'Employment Agreement',
    description: 'Comprehensive employment contract template',
    icon: '📄',
    category: 'Employment',
    signatureRequired: 'dual',
    questions: [
      { id: 'employeeName', text: 'Employee Full Name', type: 'text', required: true },
      { id: 'position', text: 'Job Position', type: 'text', required: true },
      { id: 'salary', text: 'Annual Salary', type: 'number', required: true },
      { id: 'startDate', text: 'Start Date', type: 'date', required: true }
    ]
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    description: 'Protect confidential information',
    icon: '🔒',
    category: 'Legal',
    signatureRequired: 'dual',
    questions: [
      { id: 'disclosingParty', text: 'Disclosing Party Name', type: 'text', required: true },
      { id: 'receivingParty', text: 'Receiving Party Name', type: 'text', required: true },
      { id: 'purposeDescription', text: 'Purpose Description', type: 'textarea', required: true }
    ]
  }
];

// Get document templates
router.get('/templates', (req, res) => {
  res.json(documentTemplates);
});

// Generate document prompt (for AI)
router.post('/generate-prompt', async (req, res) => {
  try {
    const { documentType, documentDescription, questions, answers, signatureRequired } = req.body;
    
    // Generate sophisticated prompt for AI
    const prompt = `Create a professional ${documentType} document based on the following:
    
Description: ${documentDescription}

Details:
${questions.map(q => `${q.text}: ${answers[q.id] || 'Not provided'}`).join('\n')}

Requirements:
- Use formal legal language
- Include all necessary clauses
- Format as a professional document
- ${signatureRequired !== 'none' ? `Include signature sections for ${signatureRequired} parties` : 'No signatures required'}
`;

    res.json({ prompt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate document content
router.post('/generate-document', async (req, res) => {
  try {
    const { sophisticatedPrompt, documentType, formData, documentMetadata } = req.body;
    
    // Simulate AI document generation (replace with actual AI service)
    const generatedContent = `# ${documentType}

**Generated on:** ${new Date().toLocaleDateString()}

## Document Details

${Object.entries(formData).map(([key, value]) => `**${key}:** ${value}`).join('\n')}

## Terms and Conditions

This ${documentType} is created based on the provided information and serves as a legally binding agreement between the parties involved.

### 1. General Provisions
The parties agree to the terms outlined in this document and acknowledge their understanding of all clauses contained herein.

### 2. Specific Terms
${Object.entries(formData).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

### 3. Signatures
${documentMetadata.signatureRequired !== 'none' ? 'This document requires signatures from all parties.' : 'No signatures required for this document.'}

---

*This document was generated using DocuGen AI technology.*`;

    // Save document to database
    const document = new Document({
      name: documentType,
      type: documentType,
      content: generatedContent,
      formData,
      createdBy: req.body.userId || null,
      guestEmail: req.body.guestEmail || null,
      templateId: documentMetadata.id
    });

    await document.save();

    res.json({
      document: generatedContent,
      documentId: document._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user documents
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type } = req.query;
    
    const query = { createdBy: req.user._id };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) {
      query.type = type;
    }

    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Document.countDocuments(query);

    res.json({
      documents,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific document
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download document
router.post('/:id/download', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check access permissions
    const hasAccess = await checkDocumentAccess(req.params.id, req.user?._id, req.body.guestEmail);
    
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied. Purchase required.' });
    }

    // Increment download count
    document.downloadCount += 1;
    await document.save();

    res.json({
      success: true,
      document: document.content,
      downloadCount: document.downloadCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to check document access
async function checkDocumentAccess(documentId, userId, guestEmail) {
  // Check if user created the document
  const document = await Document.findById(documentId);
  if (document.createdBy && document.createdBy.toString() === userId?.toString()) {
    return true;
  }

  // Check if document was purchased
  const purchase = await DocumentPurchase.findOne({
    documentId,
    $or: [
      { userId },
      { guestEmail }
    ],
    status: 'completed'
  });

  return !!purchase;
}

module.exports = router;
