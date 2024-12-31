import { createContext } from "react";
import { io, Socket } from "socket.io-client";

//this section creates the socket.io connection with the server
export const socket = io("http://localhost:5000");
export const WebsoketContext = createContext<Socket>(socket);
export const WebsoketProvider = WebsoketContext.Provider;
