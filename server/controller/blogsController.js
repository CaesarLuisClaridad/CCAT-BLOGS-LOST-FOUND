const Blogs = require("../models/blogModel");
const mongoose = require("mongoose");
const Notification = require("../models/notificationModel")
const User = require("../models/userModel")


//get all the blogs of specific user
const getAllBlogs = async (req, res) => {
  const user_id = req.user.id;
  console.log("User ID:", req.user.id);
  try {
    const blogs = await Blogs.find({ user_id })
      .sort({ createdAt: -1 })
      .populate("user_id", "username gender profilePicture");
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all the blog of the user who posted blogs
const getAllUserBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({})
      .sort({ createdAt: -1 })
      .populate("user_id", "username gender profilePicture");
    console.log(blogs);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single
const getSingleBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "workout not found & not a valid id" });
  }

  const blog = await Blogs.findById(id);

  if (!blog) {
    return res
      .status(404)
      .json({ error: "workout not found & not a valid id" });
  }

  res.status(200).json(blog);
};

//create new blog

const createBlog = async (req, res) => {
  const { title, body } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ err: "Please fill all fields!", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const blog = await Blogs.create({ title, body, user_id });
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//delete single blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "blog not found & not a valid id" });
  }

  const blog = await Blogs.findOneAndDelete({ _id: id });

  if (!blog) {
    return res.status(404).json({ error: "blog not found & not a valid id" });
  }

  res.status(200).json(blog);
};

//updateLikes

const updateLikes = async (req, res) => {
  const { id } = req.params;
  const { like } = req.body;

  try {
    const blog = await Blogs.findById(id).populate('user_id');
    if (!blog) {
      res.status(404).json({ error: "blog not found & not a valid" });
    }
    blog.like += like;
    await blog.save();

    if (like > 0) {
      // Assuming like > 0 means a user likes the blog
      const liker = await User.findById(req.user._id); // Fetching the liker's user document
      if (!liker) {
        return res.status(404).json({ error: "Liker not found" });
    }
    
    await Notification.create({
      toUser: blog.user_id, // The owner of the blog
      fromUser: req.user._id, // The liker
      blog: id,
      message: `Your blog post "${blog.title}" was liked by ${liker.username}`,
    });

  }


    res.status(200).json({ likes: blog.like });
  } catch (error) {
    res.status(500).res({ error: "internal error" });
  }
};



//update single blog
const updateBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "blog not found & not a valid id" });
  }

  const blog = await Blogs.findOneAndUpdate(
    { _id: id },
    {...req.body},
    { new: true}
  );

  if (!blog) {
    return res.status(404).json({ error: "blog not found & not a valid id" });
  }

  res.status(200).json(blog);
};

module.exports = {
  createBlog,
  getAllUserBlogs,
  getSingleBlog,
  getAllBlogs,
  deleteBlog,
  updateLikes,
  updateBlog,
};
