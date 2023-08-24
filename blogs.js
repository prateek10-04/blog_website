const express = require('express');
const router=express.Router()
const Blog=require('../models/blog')
const path=require('path')


router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
});

router.get('/blogs',async (req,res)=>{
    
    Blog.find()
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch blogs' })
    })
})

router.post('/blogs', (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date:req.body.date
  });

  blog.save()
    .then((newBlog) => {
      res.status(201).json(newBlog);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

router.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;

  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch blog' });
    });
});



router.put('/blogs/:id', (req, res) => {
  const blogId = req.params.id;

  Blog.findByIdAndUpdate(blogId, req.body, { new: true })
    .then((updatedBlog) => {
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(updatedBlog);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update blog' });
    });
});


router.delete('/blogs/:id', (req,res)=>{
    const blogId = req.params.id;

  
  Blog.findOneAndDelete({ _id: blogId })
    .then(() => {
      res.json({ message: 'Blog deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete blog' });
    });
})

module.exports=router