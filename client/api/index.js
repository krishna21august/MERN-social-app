// api/index.js
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000/");

function connect(cb) {
  socket.on("chat", message => {
    console.log(message);
    cb(message);
  });
}

export { connect };
