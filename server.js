const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 5000;  

mongoose.connect('mongodb://localhost:27017/blogData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database successfully');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

const blogRouter=require('./routes/blogs')
app.use('/',blogRouter)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});