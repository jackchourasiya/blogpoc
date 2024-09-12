const bcrypt  =   require('bcryptjs');
const jwt     =   require('jsonwebtoken');
const User    =   require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Check if user exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate a JWT token if the credentials are correct
    const token = jwt.sign({ userId: user._id }, 'sourabh', {
      expiresIn: '1h'
    });

    // Send success response with the token
    return res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};
