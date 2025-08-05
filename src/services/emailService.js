const nodemailer = require('nodemailer');

// Create transporter for email sending
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send approval email with certificate
const sendApprovalEmail = async (businessData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: businessData.email,
    subject: 'Business Application Approved - Certificate Attached',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Your Business Application Has Been Approved!</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Dear <strong>${businessData.ownerName}</strong>,
          </p>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            We are pleased to inform you that your business application for <strong>"${businessData.businessName}"</strong> has been successfully approved!
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Business Details:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>Business Name:</strong> ${businessData.businessName}</li>
              <li><strong>Business Type:</strong> ${businessData.businessType.replace(/_/g, ' ')}</li>
              <li><strong>Address:</strong> ${businessData.address}</li>
              <li><strong>Owner:</strong> ${businessData.ownerName}</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Your business certificate is attached to this email. Please keep it safe as you may need it for future reference.
          </p>
          
          <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #155724; margin: 0; font-weight: bold;">
              ✅ Your business is now officially registered and approved!
            </p>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            If you have any questions or need assistance, please don't hesitate to contact our support team.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Best regards,<br>
              <strong>Business Registration Team</strong>
            </p>
          </div>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `${businessData.businessName}_Certificate.pdf`,
        content: generateCertificatePDF(businessData),
        contentType: 'application/pdf'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Approval email sent successfully to:', businessData.email);
    return { success: true, message: 'Approval email sent successfully' };
  } catch (error) {
    console.error('Error sending approval email:', error);
    return { success: false, message: 'Failed to send approval email' };
  }
};

// Send rejection email
const sendRejectionEmail = async (businessData) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: businessData.email,
    subject: 'Business Application Status Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Application Update</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Regarding Your Business Application</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Dear <strong>${businessData.ownerName}</strong>,
          </p>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Thank you for submitting your business application for <strong>"${businessData.businessName}"</strong>.
          </p>
          
          <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #721c24; margin: 0; font-weight: bold;">
              ❌ Unfortunately, your application has been rejected at this time.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Application Details:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li><strong>Business Name:</strong> ${businessData.businessName}</li>
              <li><strong>Business Type:</strong> ${businessData.businessType.replace(/_/g, ' ')}</li>
              <li><strong>Address:</strong> ${businessData.address}</li>
              <li><strong>Owner:</strong> ${businessData.ownerName}</li>
            </ul>
          </div>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            This decision may be due to various factors such as incomplete documentation, regulatory requirements, or other administrative reasons.
          </p>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            You are welcome to reapply after addressing any potential issues. For more information about the rejection or to discuss your application, please contact our support team.
          </p>
          
          <div style="background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #0c5460; margin: 0;">
              <strong>Need Help?</strong> Our support team is available to assist you with any questions or to help you understand the requirements for a successful application.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #999; font-size: 14px;">
              Best regards,<br>
              <strong>Business Registration Team</strong>
            </p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Rejection email sent successfully to:', businessData.email);
    return { success: true, message: 'Rejection email sent successfully' };
  } catch (error) {
    console.error('Error sending rejection email:', error);
    return { success: false, message: 'Failed to send rejection email' };
  }
};

// Generate a simple certificate PDF (placeholder function)
const generateCertificatePDF = (businessData) => {
  // This is a placeholder. In a real application, you would use a library like PDFKit or jsPDF
  // to generate an actual PDF certificate
  const certificateContent = `
    BUSINESS REGISTRATION CERTIFICATE
    
    This is to certify that
    
    ${businessData.businessName}
    
    Owned by: ${businessData.ownerName}
    Business Type: ${businessData.businessType.replace(/_/g, ' ')}
    Address: ${businessData.address}
    
    Has been successfully registered and approved.
    
    Date: ${new Date().toLocaleDateString()}
    
    Business Registration Authority
  `;
  
  return Buffer.from(certificateContent, 'utf8');
};

module.exports = {
  sendApprovalEmail,
  sendRejectionEmail
};