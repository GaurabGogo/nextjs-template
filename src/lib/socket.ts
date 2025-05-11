import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:8000";

export const getSocket = (currentUserId: string): Socket => {
  const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    secure: true,
    auth: {
      userId: currentUserId,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
  });

  return socket;
};
