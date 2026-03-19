const nodemailer = require('nodemailer');

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function isConfigured() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('[Email] Skipping - email credentials not configured.');
    return false;
  }
  return true;
}

/**
 * 1. Sends a confirmation email TO THE CLIENT when they submit a booking.
 */
async function sendClientConfirmation(lead) {
  if (!isConfigured()) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
      <div style="max-width:580px;margin:40px auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#7c3aed,#f43f5e);padding:28px 32px;">
          <h1 style="margin:0;font-size:22px;letter-spacing:2px;text-transform:uppercase;">BRIXTON StudioX</h1>
          <p style="margin:6px 0 0;opacity:0.85;font-size:13px;">Booking Confirmation</p>
        </div>

        <!-- Body -->
        <div style="padding:36px 32px;">
          <h2 style="font-size:20px;margin:0 0 8px;color:#f1f1f1;">Hey ${lead.name}! 👋</h2>
          <p style="font-size:15px;color:#aaa;line-height:1.7;margin:0 0 28px;">
            We've received your booking request and we're excited to connect with you.<br>
            Our team will get back to you within <strong style="color:#f59e0b;">48 hours</strong>.
          </p>

          <!-- Booking Summary -->
          <div style="background:#0d0d0d;border:1px solid #222;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
            <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#555;margin:0 0 16px;">Your Booking Details</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;color:#666;font-size:12px;text-transform:uppercase;width:110px;">Name</td>
                <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:14px;color:#e0e0e0;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;color:#666;font-size:12px;text-transform:uppercase;">Phone</td>
                <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:14px;color:#e0e0e0;">${lead.phone}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;color:#666;font-size:12px;text-transform:uppercase;">Service</td>
                <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;font-size:14px;color:#f59e0b;font-weight:bold;">${lead.service}</td>
              </tr>
              ${lead.message ? `
              <tr>
                <td style="padding:8px 0;color:#666;font-size:12px;text-transform:uppercase;">Message</td>
                <td style="padding:8px 0;font-size:14px;color:#aaa;">${lead.message}</td>
              </tr>` : ''}
            </table>
          </div>

          <!-- CTA -->
          <p style="font-size:14px;color:#aaa;line-height:1.7;margin:0 0 24px;">
            In the meantime feel free to check out our work or reach us directly:
          </p>
          <a href="https://brixtonstudiox.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#f43f5e);color:#fff;text-decoration:none;padding:13px 28px;border-radius:50px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
            Visit Our Website
          </a>

          <!-- Contact -->
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #1a1a1a;">
            <p style="font-size:12px;color:#555;margin:0;">📞 +91 97545 93311 &nbsp;·&nbsp; 📧 brixtonstudiox@gmail.com</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#0a0a0a;padding:16px 32px;text-align:center;">
          <p style="font-size:11px;color:#333;margin:0;">© ${new Date().getFullYear()} Brixton StudioX. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Brixton StudioX" <${process.env.EMAIL_USER}>`,
    to: lead.email,
    subject: `✅ Booking Confirmed — We'll be in touch within 48 hours!`,
    html,
  });
  console.log(`[Email] Confirmation sent to client: ${lead.email}`);
}

/**
 * 2. Sends a new lead alert TO THE ADMIN (Brixton team).
 */
async function sendLeadNotification(lead) {
  if (!isConfigured() || !process.env.ADMIN_EMAIL) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
      <div style="max-width:560px;margin:40px auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#7c3aed,#f43f5e);padding:24px 32px;">
          <h1 style="margin:0;font-size:20px;letter-spacing:2px;text-transform:uppercase;">BRIXTON StudioX</h1>
          <p style="margin:6px 0 0;opacity:0.8;font-size:13px;">🎯 New Booking Alert</p>
        </div>
        <div style="padding:32px;">
          <h2 style="font-size:18px;margin:0 0 24px;color:#f1f1f1;">New booking just came in!</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;width:110px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;">${lead.name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;">Email</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;"><a href="mailto:${lead.email}" style="color:#60a5fa;">${lead.email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;"><a href="tel:${lead.phone}" style="color:#60a5fa;">${lead.phone}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;">Service</td><td style="padding:10px 0;border-bottom:1px solid #222;font-size:14px;color:#f59e0b;font-weight:bold;">${lead.service}</td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;">Message</td><td style="padding:10px 0;font-size:14px;color:#aaa;">${lead.message || '—'}</td></tr>
          </table>
          <p style="margin:28px 0 0;font-size:12px;color:#555;">Received on ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Brixton StudioX" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🎯 New Booking: ${lead.name} — ${lead.service}`,
    html,
  });
  console.log(`[Email] Booking alert sent to admin: ${process.env.ADMIN_EMAIL}`);
}

/**
 * Diagnostic: Tests the email configuration and returns the result.
 */
async function testEmail(toEmail) {
  if (!isConfigured()) {
    throw new Error('Email credentials (EMAIL_USER or EMAIL_PASS) are missing in environment variables.');
  }

  const transporter = createTransporter();
  await transporter.verify();
  
  const info = await transporter.sendMail({
    from: `"Brixton StudioX" <${process.env.EMAIL_USER}>`,
    to: toEmail || process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: '🧪 SMTP Test Success — Brixton StudioX',
    html: `
      <div style="font-family:sans-serif;padding:20px;background:#f4f4f4;">
        <h2 style="color:#7c3aed;">SMTP Connection Verified!</h2>
        <p>This is a test email sent from your Brixton StudioX backend to verify that your credentials are working.</p>
        <p><b>Sent At:</b> ${new Date().toLocaleString()}</p>
        <p><b>Service:</b> Gmail</p>
      </div>
    `
  });
  return info;
}

module.exports = { sendLeadNotification, sendClientConfirmation, testEmail };
