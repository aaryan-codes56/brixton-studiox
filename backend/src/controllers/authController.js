const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'brixton2024';

  if (username === adminUser && password === adminPass) {
    const payload = {
      username,
      role: 'admin'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'super_secret_brixton_jwt_key', {
      expiresIn: '7d'
    });

    res.json({ success: true, token, username, role: 'admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};
