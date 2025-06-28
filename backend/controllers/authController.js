const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

// Volunteer Registration
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, password, latitude, longitude } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create new volunteer user
    const newUser = new User({
      name,
      email,
      phone,
      latitude,
      longitude,
      passwordHash,
      role: 'volunteer',
      isVerified: true
    });

    await newUser.save();

    // Generate token
    const token = generateToken(newUser);
    return res.status(201).json({ message: 'Volunteer registered successfully', token });

  } catch (err) {
    console.error("❌ Error in registerVolunteer:", err.message);
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Login (volunteer/admin)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Check password
    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate token
    const token = generateToken(user);
    return res.json({ token, role: user.role });

  } catch (err) {
    console.error("❌ Error in loginUser:", err.message);
    console.error(err.stack);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
