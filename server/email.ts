import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter connection
async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('Email server connection verified');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
}

export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  // Verify email configuration first
  const isEmailConfigValid = await verifyEmailConfig();
  if (!isEmailConfigValid) {
    throw new Error('Email service is not properly configured');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "info@edurecruitment.org", 
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}