const BlogPost = require('../models/BlogPost');

// @desc    Get all published blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true })
      .populate('author', 'name');
      
    if (!post) {
      return res.status(404).json({ success: false, error: 'Bài viết không tồn tại' });
    }
    
    // Increment view count
    post.views += 1;
    await post.save();
    
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostBySlug
};
