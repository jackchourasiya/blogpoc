const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes'); 
const blogRoutes = require('./routes/blogRoutes'); 


app.use(cors());
app.use(express.json());
// Use the authentication routes
app.use(authRoutes);
app.use(blogRoutes);


mongoose.connect('mongodb+srv://sourabhchourasiya9893:sfzbnfB29y0cB3d6@cluster0.tpmrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/blog-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
