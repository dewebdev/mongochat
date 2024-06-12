const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const Chat = require("./models/chat");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// Database connection start

main()
  .then((res) => {
    console.log("Connection To Database Successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Database connection end

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("chats.ejs", {chats});
});

app.get("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;
  let editChat = await Chat.findById(id);
  res.render("editChat.ejs", {editChat});
});

app.post("/chats/:id/edit", async (req, res) => {
  let {message} = req.body;
  let {id} = req.params;
  await Chat.findByIdAndUpdate(id, {msg: message});
  res.redirect("/chats");
});

app.get("/chats/new", (req, res) => {
  res.render("createChat.ejs");
});

app.post("/chats/new", (req, res) => {
  let {sender, receiver, message} = req.body;
  let chat = new Chat({
    from: sender,
    to: receiver,
    msg: message,
    created_at: new Date(),
  });
  chat.save();
  res.redirect("/chats");
});

app.get("/chats/:id/delete", async (req, res) => {
  let {id} = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.listen(PORT, (req, res) => {
  console.log(`Server Started at ${PORT}`);
});
