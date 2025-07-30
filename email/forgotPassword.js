export const generateForgotPasswordEmail = (
  resetLink,
  userName = "User",
  expiryTime = "24 hours"
) => {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            line-height: 1.6;
            color: #333;
            min-height: 100vh;
            padding: 20px 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 50px 30px;
            text-align: center;
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            pointer-events: none;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 1;
        }
        
        .header p {
            font-size: 18px;
            opacity: 0.95;
            font-weight: 400;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 50px 40px;
        }
        
        .greeting {
            font-size: 20px;
            color: #333;
            margin-bottom: 25px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        
        .reset-section {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            margin: 40px 0;
            position: relative;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(240, 147, 251, 0.3);
        }
        
        .reset-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain2" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain2)"/></svg>');
            pointer-events: none;
        }
        
        .reset-button {
            display: inline-block;
            background: rgba(255, 255, 255, 0.95);
            color: #f5576c;
            padding: 18px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 18px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .reset-button:hover {
            background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
        }
        
        .info-box h3 {
            color: #667eea;
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .info-box p {
            color: #666;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .info-box ul {
            color: #666;
            font-size: 14px;
            padding-left: 20px;
        }
        
        .info-box li {
            margin-bottom: 5px;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            color: #6c757d;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .footer .link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer .link:hover {
            text-decoration: underline;
        }
        
        .security-note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .security-note h4 {
            color: #856404;
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .security-note p {
            color: #856404;
            font-size: 14px;
            margin: 0;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header {
                padding: 40px 20px;
            }
            
            .header h1 {
                font-size: 26px;
            }
            
            .content {
                padding: 30px 25px;
            }
            
            .reset-section {
                padding: 30px 20px;
            }
            
            .reset-button {
                padding: 16px 32px;
                font-size: 16px;
            }
            
            .footer {
                padding: 25px 25px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔐 Reset Your Password</h1>
            <p>We've received a request to reset your password</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello ${userName}! 👋
            </div>
            
            <div class="message">
                We received a request to reset the password for your account. If you made this request, please click the button below to create a new password. If you didn't make this request, you can safely ignore this email.
            </div>
            
            <div class="reset-section">
                <a href="${resetLink}" class="reset-button" target="_blank">
                    🔑 Reset My Password
                </a>
            </div>
            
            <div class="info-box">
                <h3>📋 What happens next?</h3>
                <ul>
                    <li>Click the reset button above</li>
                    <li>You'll be taken to a secure page to create a new password</li>
                    <li>Your new password will be active immediately</li>
                    <li>This link will expire in ${expiryTime}</li>
                </ul>
            </div>
            
            <div class="security-note">
                <h4>🔒 Security Notice</h4>
                <p>For your security, this password reset link will expire in ${expiryTime}. If you need to reset your password after this time, please request a new reset link from our website.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.</p>
            <p>This email was sent to you because someone requested a password reset for your account.</p>
            <p>&copy; ${currentYear} Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
