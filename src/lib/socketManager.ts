import { io, Socket } from 'socket.io-client';
// import { useToast } from "@/hooks/useToast"

class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | null = null;
  private token: string | null = null;
  private listeners: Set<(connected: boolean) => void> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private initialReconnectDelay = 1000;
  private maxReconnectDelay = 30000;

  private constructor() {}

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  connect(token: string) {
    if (this.socket?.connected && this.token === token) {
      return;
    }

    this.token = token;
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(serverUrl, {
      auth: { token: `${token}` },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.initialReconnectDelay,
      reconnectionDelayMax: this.maxReconnectDelay,
      timeout: 20000,
    });

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected successfully');
      this.reconnectAttempts = 0;
      this.notifyListeners(true);
      this.toast({
        title: "连接成功",
        description: "已成功连接到服务器",
        variant: "success"
      });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.notifyListeners(false);
      
      if (reason === 'io server disconnect') {
        this.toast({
          title: "连接断开",
          description: "服务器主动断开连接",
          variant: "warning"
        });
      } else if (reason === 'transport close') {
        this.toast({
          title: "连接断开",
          description: "网络连接已断开",
          variant: "error" 
        });
      } else {
        this.toast({
          title: "连接断开",
          description: "连接已断开，正在尝试重新连接",
          variant: "warning"
        });
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.notifyListeners(false);
      this.reconnectAttempts++;

      if (error.message.includes('Authentication')) {
        this.toast({
          title: "认证失败",
          description: "请重新登录",
          variant: "error"
        });
      } else {
        this.toast({
          title: "连接错误",
          description: `连接失败: ${error.message}`,
          variant: "error"
        });
      }

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.toast({
          title: "连接失败",
          description: "已达到最大重试次数,请刷新页面重试",
          variant: "error"
        });
      }
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnection attempt ${attempt}`);
      this.toast({
        title: "正在重连",
        description: `正在尝试第${attempt}次重新连接`,
        variant: "loading"
      });
    });

    this.socket.on('reconnect_failed', () => {
      console.log('Reconnection failed');
      this.toast({
        title: "重连失败",
        description: "无法重新连接到服务器",
        variant: "error"
      });
    });
  }

  private notifyListeners(connected: boolean) {
    this.listeners.forEach(listener => listener(connected));
  }

  addConnectionListener(listener: (connected: boolean) => void) {
    this.listeners.add(listener);
    if (this.socket?.connected) {
      listener(true);
    }
  }

  removeConnectionListener(listener: (connected: boolean) => void) {
    this.listeners.delete(listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit(event, ...args);
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket?.on(event, callback);
  }

  once(event: string, callback: (...args: any[]) => void) {
    this.socket?.once(event, callback);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  private toast(props: { title: string; description: string; variant?: "default" | "success" | "error" | "warning" | "loading" }) {
    // const { addToast } = useToast.getState()
    addToast(props)
  }
}

export const socketManager = SocketManager.getInstance(); 