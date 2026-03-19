const nodemailer = require('nodemailer');

/**
 * Sends an HTML email notification to the admin when a new lead is submitted.
 */
async function sendLeadNotification(lead) {
  const { EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !ADMIN_EMAIL) {
    console.log('[Email] Skipping notification - email credentials not configured.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
      <div style="max-width:560px;margin:40px auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#f43f5e);padding:24px 32px;">
          <h1 style="margin:0;font-size:20px;letter-spacing:2px;text-transform:uppercase;">BRIXTON StudioX</h1>
          <p style="margin:6px 0 0;opacity:0.8;font-size:13px;">New Lead Notification</p>
        </div>
        <div style="padding:32px;">
          <h2 style="font-size:18px;margin:0 0 24px;color:#f1f1f1;">🎯 New Lead Received</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;width:120px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;">${lead.name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;">Email</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;">${lead.email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;">${lead.phone}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;">Service</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;color:#f59e0b;">${lead.service}</td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;">Message</td><td style="padding:10px 0;font-size:14px;color:#aaa;">${lead.message || '—'}</td></tr>
          </table>
          <p style="margin:28px 0 0;font-size:12px;color:#555;">Received on ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Brixton StudioX" <${EMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `🎯 New Lead: ${lead.name} — ${lead.service}`,
    html,
  });

  console.log(`[Email] Lead notification sent to ${ADMIN_EMAIL}`);
}

module.exports = { sendLeadNotification };
