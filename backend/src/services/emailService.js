const nodemailer = require('nodemailer');

// 1. Singleton Transporter setup with explicit SMTP for better reliability
let transporter = null;

const createTransporter = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: { user, pass },
    // Some networks/environments (like Render) might need these tweaks
    tls: {
      rejectUnauthorized: false
    }
  });
};

const isConfigured = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();
  return (user && pass);
};

/**
 * Diagnostic: Verifies the SMTP connection on startup.
 */
async function verifyConnection() {
  if (!isConfigured()) {
    console.warn('⚠️ [Email] Configuration missing: EMAIL_USER or EMAIL_PASS not set.');
    return;
  }

  try {
    const t = createTransporter();
    await t.verify();
    transporter = t; // Cache the verified transporter
    console.log('✅ [Email] SMTP Connection verified successfully');
  } catch (err) {
    console.error('❌ [Email] SMTP Connection failed:', err.message);
    console.error('   Hint: Ensure EMAIL_PASS is a valid 16-character App Password (no spaces).');
  }
}

/**
 * 1. Sends a confirmation email TO THE CLIENT when they submit a booking.
 */
async function sendClientConfirmation(lead) {
  if (!isConfigured()) return;
  if (!transporter) transporter = createTransporter();
  if (!transporter) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
      <div style="max-width:580px;margin:40px auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        <div style="background:linear-gradient(135deg,#7c3aed,#f43f5e);padding:32px;">
          <h1 style="margin:0;font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:900;">BRIXTON <span style="font-weight:300;">StudioX</span></h1>
          <p style="margin:8px 0 0;opacity:0.9;font-size:14px;letter-spacing:1px;">Booking Received Successfully</p>
        </div>
        <div style="padding:40px 32px;">
          <h2 style="font-size:20px;margin:0 0 12px;color:#f1f1f1;">Hey ${lead.name}! 👋</h2>
          <p style="font-size:15px;color:#aaa;line-height:1.7;margin:0 0 32px;">
            Thank you for reaching out to Brixton Studio! We've received your booking request and our team is already reviewing it.
            <br><br>
            We'll get back to you within <strong style="color:#f59e0b;">48 hours</strong> to discuss the next steps.
          </p>
          <div style="background:#0d0d0d;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:32px;">
            <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555;margin:0 0 20px;font-weight:bold;">Your Submission Details</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#777;font-size:12px;text-transform:uppercase;width:110px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:15px;color:#e0e0e0;">${lead.name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#777;font-size:12px;text-transform:uppercase;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:15px;color:#e0e0e0;">${lead.phone}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#777;font-size:12px;text-transform:uppercase;">Service</td><td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:15px;color:#f59e0b;font-weight:bold;">${lead.service}</td></tr>
              ${lead.message ? `<tr><td style="padding:10px 0;color:#777;font-size:12px;text-transform:uppercase;vertical-align:top;">Message</td><td style="padding:10px 0;font-size:14px;color:#bbb;line-height:1.5;">${lead.message}</td></tr>` : ''}
            </table>
          </div>
          <div style="text-align:center;"><a href="https://brixtonstudiox.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#f43f5e);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Visit Studio Website</a></div>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #1a1a1a;text-align:center;"><p style="font-size:12px;color:#555;margin:0;">📞 +91 97545 93311 &nbsp;·&nbsp; 📧 brixtonstudiox@gmail.com</p></div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Brixton Studio" <${process.env.EMAIL_USER.trim()}>`,
      to: lead.email,
      subject: `✅ Booking Confirmed — Brixton Studio`,
      html,
    });
    console.log(`[Email] Client confirmation sent: ${info.messageId}`);
  } catch (err) {
    console.error(`[Email] Client confirmation failed:`, err.message);
  }
}

/**
 * 2. Sends a new lead alert TO THE ADMIN (Brixton team).
 */
async function sendLeadNotification(lead) {
  if (!isConfigured()) return;
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || 'brixtonstudiox@gmail.com';
  if (!transporter) transporter = createTransporter();
  if (!transporter) return;

  const html = `
    <div style="background:#111;color:#fff;padding:24px;border:1px solid #333;border-radius:12px;font-family:sans-serif;">
      <h2 style="color:#7c3aed;">🎯 New Booking Alert</h2>
      <p><b>From:</b> ${lead.name} (${lead.email})</p>
      <p><b>Phone:</b> ${lead.phone}</p>
      <p><b>Service:</b> <span style="color:#f59e0b;">${lead.service}</span></p>
      <p><b>Message:</b> ${lead.message || '—'}</p>
      <hr style="border:0;border-top:1px solid #333;">
      <p style="font-size:12px;color:#666;">ID: ${lead.id} | ${new Date().toLocaleString('en-IN')}</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Lead Alert" <${process.env.EMAIL_USER.trim()}>`,
      to: adminEmail,
      subject: `🎯 New Booking: ${lead.name} — ${lead.service}`,
      html,
    });
    console.log(`[Email] Admin alert sent: ${info.messageId}`);
  } catch (err) {
    console.error(`[Email] Admin alert failed:`, err.message);
  }
}

module.exports = { sendLeadNotification, sendClientConfirmation, verifyConnection };
