import io from 'socket.io-client';

export default function() {
  return io.connect();
}
