const mongoose = require("mongoose");
const Chat = require("./models/chat");

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

let allChats = [
  {from: "Dhanush", to: "Maithri", msg: "Hi Maithri", created_at: new Date()},
  {from: "Maithri", to: "Raksha", msg: "Hi Raksha", created_at: new Date()},
  {from: "Raksha", to: "Kshama", msg: "Hi Kshama", created_at: new Date()},
];

Chat.insertMany(allChats);
