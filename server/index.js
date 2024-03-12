const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("SLOT_BOOKING_UPDATED", (data) => {
    socket.emit("SLOT_BOOKING_UPDATED_RESPONSE", data);
  });
  socket.on("PARKINGS_UPDATED", (data) => {
    socket.emit("PARKINGS_UPDATED_RESPONSE", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

