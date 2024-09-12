const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ msg: 'No blogs found' });
    }
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.createblog = async (req, res) => {
  const { title, content } = req.body;

  // Log the request body for debugging
  console.log('Request Body:', req.body);

  // Validate input fields
  if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required' });
  }

  try {
    // Create a new blog entry
    const userblog = new Blog({
      title,
      content,
      lastEditedBy: null,
      isLocked: true,
      lockedBy: null,
      lockedAt: null
    });

    // console.log('userblog-',userblog)
    // Save the blog entry to the database
    await userblog.save();

    // Send success response
    return res.status(201).json({ msg: 'Blog created successfully', blog: userblog });
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating blog:', error);

    // Send server error response
    return res.status(500).json({ msg: 'An error occurred while creating the blog' });
  }
};

exports.getspecificBlogs = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blogs      = await Blog.findOne({_id:blogId});
    // console.log(blogs)

    res.status(200).json({ msg: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.editBlog = async (req, res) => {
  try {
    const { blogId }  = req.params;
    const { content } = req.body;

    // Find the blog by ID
    const blog = await Blog.findOne({_id:blogId});

    // Update blog content
    blog.content      = content;
    blog.lastEditedBy = blogId;
    blog.isLocked     = true;
    blog.lockedBy     = blogId;

    // Set the lockedAt field to the current date and time
    blog.lockedAt     = new Date();

    // Save the updated blog
    await blog.save();

    // Return success response
    return res.status(200).json({ msg: 'Blog is updated' });
  } catch (error) {
    console.error('Error editing blog:', error);
    return res.status(500).send('Server error');
  }
};


exports.blogstatus = async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log('blogId-', blogId);

    // Find the blog by ID
    const blog = await Blog.findOne({ _id: blogId });

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Update the blog's status
    blog.isLocked = false; // Assuming you're unlocking the blog
    blog.lockedAt = new Date();

    // Save the updated blog
    await blog.save();

    // Return success response
    return res.status(200).json({ msg: 'Blog is locked', data: blog });
  } catch (error) {
    console.error('Error updating blog status:', error);
    return res.status(500).send('Server error');
  }
};

exports.blogs_edit_cancel = async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log('blogId-', blogId);

    // Find the blog by ID
    const blog = await Blog.findOne({ _id: blogId });

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Update the blog's status
    blog.isLocked = true; // Assuming you're unlocking the blog

    // Save the updated blog
    await blog.save();

    // Return success response
    return res.status(200).json({ msg: 'Blog is unlocked', data: blog });
  } catch (error) {
    console.error('Error updating blog status:', error);
    return res.status(500).send('Server error');
  }
};

