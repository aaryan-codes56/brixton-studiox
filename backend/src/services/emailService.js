const nodemailer = require('nodemailer');

// 1. Singleton Transporter setup with credential trimming
const getTransporter = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
};

const isConfigured = () => {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();
  if (!user || !pass) {
    console.warn('[Email] Skipping: EMAIL_USER or EMAIL_PASS not set in environment.');
    return false;
  }
  return true;
};

/**
 * 1. Sends a confirmation email TO THE CLIENT when they submit a booking.
 * Required: 48h mention + client entered details.
 */
async function sendClientConfirmation(lead) {
  if (!isConfigured()) return;

  const transporter = getTransporter();
  if (!transporter) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#fff;">
      <div style="max-width:580px;margin:40px auto;background:#111;border:1px solid #222;border-radius:16px;overflow:hidden;box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#7c3aed,#f43f5e);padding:32px;">
          <h1 style="margin:0;font-size:24px;letter-spacing:3px;text-transform:uppercase;font-weight:900;">BRIXTON <span style="font-weight:300;">StudioX</span></h1>
          <p style="margin:8px 0 0;opacity:0.9;font-size:14px;letter-spacing:1px;">Booking Received Successfully</p>
        </div>

        <!-- Body -->
        <div style="padding:40px 32px;">
          <h2 style="font-size:20px;margin:0 0 12px;color:#f1f1f1;">Hey ${lead.name}! 👋</h2>
          <p style="font-size:15px;color:#aaa;line-height:1.7;margin:0 0 32px;">
            Thank you for reaching out to Brixton StudioX! We've received your booking request and our team is already reviewing it.
            <br><br>
            We'll get back to you within <strong style="color:#f59e0b;">48 hours</strong> to discuss the next steps.
          </p>

          <!-- Booking Summary -->
          <div style="background:#0d0d0d;border:1px solid #222;border-radius:12px;padding:24px;margin-bottom:32px;">
            <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#555;margin:0 0 20px;font-weight:bold;">Your Submission Details</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#777;font-size:12px;text-transform:uppercase;width:110px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:15px;color:#e0e0e0;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#777;font-size:12px;text-transform:uppercase;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:15px;color:#e0e0e0;">${lead.phone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#777;font-size:12px;text-transform:uppercase;">Service</td>
                <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;font-size:15px;color:#f59e0b;font-weight:bold;">${lead.service}</td>
              </tr>
              ${lead.message ? `
              <tr>
                <td style="padding:10px 0;color:#777;font-size:12px;text-transform:uppercase;vertical-align:top;">Message</td>
                <td style="padding:10px 0;font-size:14px;color:#bbb;line-height:1.5;">${lead.message}</td>
              </tr>` : ''}
            </table>
          </div>

          <!-- CTA -->
          <p style="font-size:14px;color:#888;line-height:1.7;margin:0 0 24px;text-align:center;">
            In the meantime, feel free to explore our latest cinematic work:
          </p>
          <div style="text-align:center;">
            <a href="https://brixtonstudiox.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#f43f5e);color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase;box-shadow: 0 10px 20px rgba(124,58,237,0.3);">
              Visit Studio Website
            </a>
          </div>

          <!-- Contact Social -->
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #1a1a1a;text-align:center;">
            <p style="font-size:12px;color:#555;margin:0;">📞 +91 97545 93311 &nbsp;·&nbsp; 📧 brixtonstudiox@gmail.com</p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#0a0a0a;padding:20px;text-align:center;border-top:1px solid #1a1a1a;">
          <p style="font-size:11px;color:#333;margin:0;">© ${new Date().getFullYear()} BRIXTON STUDIOX. CINEMATIC EXCELLENCE.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Brixton StudioX" <${process.env.EMAIL_USER.trim()}>`,
      to: lead.email,
      subject: `✅ Booking Confirmed — BX StudioX`,
      html,
    });
    console.log(`[Email] Success: Confirmation sent to ${lead.email}`);
  } catch (err) {
    console.error(`[Email] Error sending to client (${lead.email}):`, err.message);
  }
}

/**
 * 2. Sends a new lead alert TO THE ADMIN (Brixton team).
 */
async function sendLeadNotification(lead) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || 'brixtonstudiox@gmail.com';
  if (!isConfigured()) return;

  const transporter = getTransporter();
  if (!transporter) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#000;font-family:sans-serif;color:#fff;">
      <div style="max-width:500px;margin:20px auto;background:#111;border:1px solid #333;border-radius:12px;overflow:hidden;">
        <div style="background:#7c3aed;padding:20px;text-align:center;">
          <h1 style="margin:0;font-size:18px;letter-spacing:2px;color:#fff;">NEW LEAD: ${lead.id}</h1>
        </div>
        <div style="padding:24px;">
          <div style="margin-bottom:15px;"><b style="color:#777;font-size:11px;text-transform:uppercase;">Name:</b><br><span style="font-size:16px;">${lead.name}</span></div>
          <div style="margin-bottom:15px;"><b style="color:#777;font-size:11px;text-transform:uppercase;">Email:</b><br><span style="font-size:16px;color:#60a5fa;">${lead.email}</span></div>
          <div style="margin-bottom:15px;"><b style="color:#777;font-size:11px;text-transform:uppercase;">Phone:</b><br><span style="font-size:16px;">${lead.phone}</span></div>
          <div style="margin-bottom:15px;"><b style="color:#777;font-size:11px;text-transform:uppercase;">Service:</b><br><span style="font-size:16px;color:#f59e0b;font-weight:bold;">${lead.service}</span></div>
          <div style="margin-bottom:15px;"><b style="color:#777;font-size:11px;text-transform:uppercase;">Message:</b><br><p style="font-size:14px;color:#aaa;margin:5px 0;">${lead.message || 'No message provided'}</p></div>
          <hr style="border:0;border-top:1px solid #222;margin:20px 0;">
          <p style="font-size:11px;color:#444;">ID: ${lead.id} | ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Lead Alert" <${process.env.EMAIL_USER.trim()}>`,
      to: adminEmail,
      subject: `🎯 New Booking: ${lead.name} (${lead.service})`,
      html,
    });
    console.log(`[Email] Success: Admin alert sent to ${adminEmail}`);
  } catch (err) {
    console.error(`[Email] Error sending admin alert:`, err.message);
  }
}

module.exports = { sendLeadNotification, sendClientConfirmation };
