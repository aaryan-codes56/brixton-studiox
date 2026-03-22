require('dotenv').config();
const { sendClientConfirmation, sendLeadNotification } = require('./src/services/emailService');

const mockLead = {
  id: 'BX-1001',
  name: 'Service Test',
  email: 'brixtonstudiox@gmail.com',
  phone: '0000000000',
  service: 'Web / App',
  message: 'Testing actual email service module.'
};

async function test() {
  console.log("Testing client confirmation...");
  try {
    await sendClientConfirmation(mockLead);
    console.log("Client confirmation promise resolved.");
  } catch (e) {
    console.error("Client confirmation threw error:", e);
  }

  console.log("Testing admin notification...");
  try {
    await sendLeadNotification(mockLead);
    console.log("Admin notification promise resolved.");
  } catch (e) {
    console.error("Admin notification threw error:", e);
  }
}

test();
