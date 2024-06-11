import { useEffect, useState } from "react"
import socketIOClient from 'socket.io-client';
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

const socket = socketIOClient(ENDPOINT);

export default socket