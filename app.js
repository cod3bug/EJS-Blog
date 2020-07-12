//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");


mongoose.connect("mongodb+srv://admin-sarthak:Test123@cluster0-ixb0e.mongodb.net/postDB",{useNewUrlParser:true , useUnifiedTopology:true});

const postSchema = {
  title:String,
  posts:String
};

const Post = mongoose.model("Post",postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Post.find(function(err,foundPosts){
    if(!err){
      res.render("home.ejs",{content:homeStartingContent,array:foundPosts });
    }
  })
});

app.get("/about",function(req,res){
  res.render("about.ejs",{about:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact.ejs",{contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose.ejs");
})

app.post("/",function(req,res){
  const newtitle=req.body.postTitle;
  const content=req.body.postBody;
  const newPost = new Post({
    title:newtitle,
    posts:content
  })
  newPost.save();
  res.redirect("/");
  
})

app.get("/posts/:titles",function(req,res){
  Post.find(function(err,foundPosts){
    if(!err){
      foundPosts.forEach(function(element){
        let str =element.title;
        if(str.toLowerCase()===_.lowerCase(req.params.titles)){
          console.log("Match Found!");
          res.render("post.ejs",{header:element.title,body:element.posts});
        }
        else{
          console.log("Not found");
          
        }})
    }
  })
  
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started on port 3000");
});