import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

export const setupSocketListeners = (onNotification) => {
  socket.on('notification', (data) => {
    onNotification(data);  // Handle incoming notifications
  });
};

// export const sendEvent = (event, data) => socket.emit(event, data);

export default socket;
