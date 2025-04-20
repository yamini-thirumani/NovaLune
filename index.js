const express = require("express");
const app = express();
const path = require('path');
const port = 8080;
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Sample data for Thought Journal
let posts = [
  {
    id: uuidv4(),
    username: "Emma Chen",
    content: "Wrote my first poem today. It felt like dancing with words. Sometimes the thoughts that feel the most vulnerable are the ones most worth sharing. ✨",
    date: "April 18, 2025"
  },
  {
    id: uuidv4(),
    username: "Liam Rivera",
    content: "Sometimes the quietest moments speak the loudest. Sitting by the lake this morning, watching the mist rise from the water, I felt more clarity than I have in months of overthinking.",
    date: "April 17, 2025"
  },
  {
    id: uuidv4(),
    username: "Sophia James",
    content: "The boundary between being inspired and being overwhelmed is surprisingly thin. Today I'm learning to appreciate small progress rather than waiting for massive breakthroughs.",
    date: "April 16, 2025"
  },
  {
    id: uuidv4(),
    username: "Noah Kim",
    content: "A stranger smiled at me on the subway today. Such a small gesture that somehow made the whole day brighter. Maybe we underestimate how much tiny kindnesses matter.",
    date: "April 15, 2025"
  },
  {
    id: uuidv4(),
    username: "Olivia Martinez",
    content: "Reading 'The Midnight Library' and came across this line: 'The only way to learn is to live.' Wondering how often I've chosen safety over growth...",
    date: "April 13, 2025"
  },
  {
    id: uuidv4(),
    username: "Ethan Patel",
    content: "Started a 30-day meditation practice. Day 1 thoughts: Why is sitting still for 10 minutes harder than running for an hour? The mind is a fascinating wilderness.",
    date: "April 11, 2025"
  }
];

app.listen(port, () => {
  console.log(`Thought Journal app listening on port ${port}`);
});

// Routes
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  
  // Format current date
  const today = new Date();
  const date = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  posts.push({ id, username, content, date });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  
  // Update the date to reflect the edit
  const today = new Date();
  post.date = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + " (Edited)";
  
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});