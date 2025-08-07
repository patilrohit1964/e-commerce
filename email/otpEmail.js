export const generateOTPEmail = (
  otp,
  userName = "User",
) => {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            line-height: 1.6;
            color: #333;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
        }
        
        .header p {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .otp-section {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        
        .otp-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            pointer-events: none;
        }
        
        .otp-label {
            color: white;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: 500;
            position: relative;
            z-index: 1;
        }
        
        .otp-code {
            font-size: 48px;
            font-weight: 700;
            color: white;
            letter-spacing: 8px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1;
        }
        
        .otp-expiry {
            color: white;
            font-size: 14px;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
        
        .instructions {
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            margin: 25px 0;
        }
        
        .instructions h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .instructions ul {
            list-style: none;
            padding-left: 0;
        }
        
        .instructions li {
            padding: 5px 0;
            color: #666;
            font-size: 14px;
            position: relative;
            padding-left: 20px;
        }
        
        .instructions li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #667eea;
            font-weight: bold;
        }
        
        .security-note {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 25px 0;
        }
        
        .security-note h4 {
            color: #856404;
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 600;
        }
        
        .security-note p {
            color: #856404;
            font-size: 13px;
            margin: 0;
        }
        
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .footer .company-name {
            color: #667eea;
            font-weight: 600;
        }
        
        .contact-info {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e9ecef;
        }
        
        .contact-info a {
            color: #667eea;
            text-decoration: none;
            font-size: 13px;
        }
        
        .contact-info a:hover {
            text-decoration: underline;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .otp-section {
                padding: 25px 20px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 6px;
            }
            
            .footer {
                padding: 25px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔐 OTP Verification</h1>
            <p>Secure access to your account</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello ${userName},
            </div>
            
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
                We received a request to verify your account. Please use the following One-Time Password (OTP) to complete your verification:
            </p>
            
            <div class="otp-section">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-expiry">Valid for 10 minutes</div>
            </div>
            
            <div class="instructions">
                <h3>How to use this code:</h3>
                <ul>
                    <li>Enter the code above in the verification field</li>
                    <li>Make sure to enter all digits correctly</li>
                    <li>Do not share this code with anyone</li>
                    <li>The code will expire in 10 minutes</li>
                </ul>
            </div>
            
            <div class="security-note">
                <h4>🔒 Security Notice</h4>
                <p>
                    If you didn't request this verification code, please ignore this email and ensure your account password is secure. 
                    Our support team will never ask for this code.
                </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 25px;">
                Need help? Contact our support team and we'll be happy to assist you.
            </p>
        </div>
        
        <div class="footer">
            <p>© ${currentYear} <span class="company-name">rp-commerce</span>. All rights reserved.</p>
            <p>This email was sent to you as part of your account verification process.</p>
            
            <div class="contact-info">
                <a href="mailto:support@${"patilrohit19649@gmail.com"
                  .toLowerCase()
                  .replace(/\s+/g, "")}.com">Contact Support</a> | 
                <a href="#">Privacy Policy</a> | 
                <a href="#">Terms of Service</a>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};
