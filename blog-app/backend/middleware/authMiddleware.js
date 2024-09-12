const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async  (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'sourabh');
    req.userId = decoded.userId;


    // Check if the user exists in the database
    const user = await User.findById({_id: req.userId}); // Assuming you have a User model and using Mongoose, adjust as necessary
    console.log('user-',user)

    // if (!user) return res.status(401).send('Invalid token. User not found.');
    
    // Optionally: check if the user is still active or valid based on database state
    // if (!user.isActive) return res.status(403).send('User is inactive.');

    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
};
