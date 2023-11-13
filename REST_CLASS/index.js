const express = require("express");
const app  =express();
const port = 3000;
const path = require("path");//joining paths
const { v4: uuidv4 } = require('uuid');// copy from npm uuid // first install it
const methodOverride = require('method-override');//for PATCH or PUT OR DEL and parsing it//to override POST AND GET

app.use(express.urlencoded({ extended : true}));//parsing POST Req
app.use(methodOverride('_method'));//parsing with PATCH OR DEL OR PUT

app.set("view engine", "ejs");//connecting under views folder ejs templates to view the page
app.set("views", path.join(__dirname, "views"));// EJS 

app.use(express.static(path.join(__dirname, "public")));//path joing static public files (CSS) and .use cz styling is used

let posts = [
    {
        id : uuidv4(),// copy from npm uuid // first install it// and randomly creates new id
        username : "Ahona Kar",
        content : "Fly like a butterfly, sting like a bee",
    },

    {
        id : uuidv4(),
        username : "Elon Musk",
        content : "Hard Work is the key to success",
    },

    {
        id : uuidv4(),
        username : "Shahrukh Kahn",
        content : "Have the hunger in your stomach if you want to be successful",
    },
];

app.get("/posts", (req,res) =>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req,res) =>{//to create new posts
    res.render("new.ejs");
})

app.post("/posts", (req,res) =>{// adding it to array of posts becase new posts are coming in
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
})


app.get("/posts/:id", (req,res) =>{//showing POST in Details
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});


app.patch("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res)=>{//EDiting posts
    let {id} = req.params;
    res.render("edit.ejs");
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});




app.listen(port, () =>{
    console.log(`app is listening on port : ${port}`);
});