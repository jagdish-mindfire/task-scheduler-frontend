import { io } from 'socket.io-client';
import { localKeys,getLocalAsString } from './localStorage';

// const socket = io(import.meta.env.VITE_API_URL + '?token='+getLocalAsString(localKeys.ACCESS_TOKEN));

export const setupSocketListeners = (onNotification) => {
  socket.on('notification', ({data}) => { 
    onNotification(data);
  });
};

// export const sendEvent = (event, data) => socket.emit(event, data);

// export default socket;   
