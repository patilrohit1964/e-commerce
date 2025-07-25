export const emailVerificationLink = (link) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                background-color: #f4f4f7;
                margin: 0;
                padding: 0;
                font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
            }
            .container {
                max-width: 480px;
                margin: 40px auto;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                padding: 32px 24px;
            }
            .header {
                text-align: center;
                margin-bottom: 24px;
            }
            .header h1 {
                color: #333;
                font-size: 24px;
                margin: 0;
            }
            .content {
                color: #555;
                font-size: 16px;
                margin-bottom: 32px;
                text-align: center;
            }
            .button {
                display: inline-block;
                padding: 12px 32px;
                background-color: #007bff;
                color: #fff;
                border-radius: 4px;
                text-decoration: none;
                font-weight: bold;
                font-size: 16px;
                margin: 0 auto;
                transition: background 0.2s;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .footer {
                margin-top: 32px;
                text-align: center;
                color: #aaa;
                font-size: 13px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Your Email Address</h1>
            </div>
            <div class="content">
                <p>Thank you for registering with us! Please confirm your email address by clicking the button below.</p>
                <a href="${link}" class="button" target="_blank">Verify Email</a>
            </div>
            <div class="footer">
                <p>If you did not create an account, you can safely ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
    return html;
}
