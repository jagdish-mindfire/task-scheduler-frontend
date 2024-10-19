import { io } from 'socket.io-client';
import { LocalKeys,GetLocalAsString } from './localStorage';

const socket = io(import.meta.env.VITE_API_URL + '?token='+GetLocalAsString(LocalKeys.ACCESS_TOKEN));

export const setupSocketListeners = (onNotification) => {
  socket.on('notification', ({data}) => { 
    onNotification(data);
  });
};

// export const sendEvent = (event, data) => socket.emit(event, data);

export default socket;
