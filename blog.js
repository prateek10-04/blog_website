
const mongoose = require('mongoose');
const blogsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    date:{
       type:Date,
        required:true,
        default: Date.now()
    }
});

module.exports=mongoose.model('blogData',blogsSchema)