import { io } from "socket.io-client";
import { API_URL } from './API_URL'

const socket = io(`https://jmb-server.onrender.com`);

export default socket