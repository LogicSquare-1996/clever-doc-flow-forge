import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'document' | 'account' | 'system' | 'payment';
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
  createdAt: string;
  readAt?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  fetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const data = await apiClient.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await apiClient.markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(notif =>
          notif._id === id ? { ...notif, isRead: true, readAt: new Date().toISOString() } : notif
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await apiClient.markAllNotificationsAsRead();
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, isRead: true, readAt: new Date().toISOString() }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await apiClient.deleteNotification(id);
      setNotifications(prev => prev.filter(notif => notif._id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  useEffect(() => {
    // Only fetch notifications if user is authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchNotifications();
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      fetchNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
