<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; padding: 40px;">
    <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="margin-top: 0; color: #0f172a; font-size: 24px;">Your Login Code</h2>
        <p style="color: #475569; font-size: 16px; line-height: 1.5;">Use the following code to log in. This code expires in 10 minutes.</p>
        <div style="background: #f1f5f9; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0f172a; font-family: 'Courier New', monospace;">{{ $loginCode->code }}</span>
        </div>
        <p style="color: #94a3b8; font-size: 14px;">If you didn't request this code, you can safely ignore this email.</p>
    </div>
</body>
</html>