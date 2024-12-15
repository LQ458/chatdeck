import { useEffect, useState } from 'react';
import { socketManager } from '../lib/socketManager';
import { useAuth } from './useAuth';
import { Toast } from 'primereact/toast';

export const useSocket = ({
  toast
}: {
  toast: React.RefObject<Toast>
}) => {
  const [connected, setConnected] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    socketManager.connect(token);
    
    const handleConnection = (isConnected: boolean) => {
      setConnected(isConnected);
    };

    socketManager.addConnectionListener(handleConnection);
    
    return () => {
      socketManager.removeConnectionListener(handleConnection);
    };
  }, [token]);

  const getRooms = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      if (!socketManager.isConnected()) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "未连接到服务器"
        });
        reject(new Error('Socket not connected'));
        return;
      }

      socketManager.once('roomsList', (rooms) => {
        resolve(rooms);
      });

      socketManager.once('error', (error) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error
        });
        reject(new Error(error));
      });

      socketManager.emit('getRooms');
    });
  };

  const getRoom = async (roomId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!socketManager.isConnected()) {
        reject(new Error('Socket not connected'));
        return;
      }

      socketManager.once('roomDetails', (room) => {
        resolve(room);
      });

      socketManager.once('error', (error) => {
        reject(new Error(error));
      });

      socketManager.emit('getRoom', roomId);
    });
  };

  const deleteRoom = async (roomId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!socketManager.isConnected()) {
        reject(new Error('Socket not connected'));
        return;
      }

      socketManager.once('roomDeleted', () => {
        resolve();
      });

      socketManager.once('error', (error) => {
        reject(new Error(error));
      });

      socketManager.emit('deleteRoom', roomId);
    });
  };

  return {
    connected,
    getRooms,
    getRoom,
    deleteRoom
  };
};