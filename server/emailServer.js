require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sendApprovalEmail, sendRejectionEmail } = require('../src/services/emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { businessData, action } = req.body;
    
    if (!businessData || !action) {
      return res.status(400).json({
        success: false,
        message: 'Business data and action are required'
      });
    }

    let emailResult;
    
    if (action === 'approve') {
      emailResult = await sendApprovalEmail(businessData);
    } else if (action === 'reject') {
      emailResult = await sendRejectionEmail(businessData);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be "approve" or "reject"'
      });
    }

    res.json(emailResult);
    
  } catch (error) {
    console.error('Error in email endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});