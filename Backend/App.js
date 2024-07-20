let express = require("express");
let path = require("path")
let app = express();
// --------------------------deployment------------------------------
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  }
  
  // Route to serve index.html for all client-side routes in production
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    } else {
      res.send('API is running..');  // Fallback for non-production environment
    }
  });

// --------------------------deployment------------------------------
let dotenv = require("dotenv")
const chats = require("./data/data.js");
let connectDB =  require("./config/db.js")
let userRoutes= require("./Routes/userRoutes.js");
let chatRoutes = require("./Routes/chatsRoute.js")
let messageRoutes= require("./Routes/messageRoute.js")





const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
dotenv.config()
app.use(express.json());
connectDB();
let cors= require("cors")
app.use(cors())
app.get("/",(req,res)=>{
    res.send(chats)
})

app.use("/api/user",userRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
//error handling middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT;
 let server=app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})

let io =require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
})

io.on("connection" ,(socket)=>{
    console.log("connection is established with socket.io")
    socket.on("setup",(userdata)=>{
        socket.join(userdata._id);
        console.log(userdata._id)
        socket.emit("connected")
    })
    socket.on("join chat" ,(room)=>{
        socket.join(room);
        console.log("user is joined room" + room)
    })
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    
})

