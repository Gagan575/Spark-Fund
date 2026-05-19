
// import { io } from "socket.io-client";

// const socket = io("https://horary-rueben-unbattling.ngrok-free.dev/", {
//   transports: ["websocket"],
//   autoConnect: true
// });

// export default socket;
import { io } from "socket.io-client";

// Connect to ngrok HTTPS URL, force websocket
const socket = io("http://localhost:5000/", {
  transports: ["websocket"],
  secure: true,   // ensure WSS (secure websocket)
  reconnection: true,
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default socket;
