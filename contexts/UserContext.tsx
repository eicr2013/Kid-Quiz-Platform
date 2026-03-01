'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  name: string;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  login: (name: string, password?: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Admin password - in production, this should be in environment variables
const ADMIN_PASSWORD = 'admin123';

const DEFAULT_USER_NAME = 'Student';

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // No login: use default user so app goes straight to the game
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch {
        setUser({ name: DEFAULT_USER_NAME, createdAt: new Date().toISOString() });
      }
    } else {
      setUser({ name: DEFAULT_USER_NAME, createdAt: new Date().toISOString() });
    }
  }, []);

  // Get list of active users (currently logged in)
  const getActiveUsers = (): string[] => {
    try {
      const activeUsers = localStorage.getItem('activeUsers');
      return activeUsers ? JSON.parse(activeUsers) : [];
    } catch {
      return [];
    }
  };

  // Add user to active users list
  const addToActiveUsers = (userName: string) => {
    const activeUsers = getActiveUsers();
    if (!activeUsers.includes(userName)) {
      activeUsers.push(userName);
      localStorage.setItem('activeUsers', JSON.stringify(activeUsers));
    }
  };

  // Remove user from active users list
  const removeFromActiveUsers = (userName: string) => {
    const activeUsers = getActiveUsers();
    const filtered = activeUsers.filter(name => name !== userName);
    localStorage.setItem('activeUsers', JSON.stringify(filtered));
  };

  const login = (name: string, password?: string) => {
    const isAdminUser = name.toLowerCase() === 'admin' || name.toLowerCase() === 'teacher';

    // Validate admin password
    if (isAdminUser) {
      if (password !== ADMIN_PASSWORD) {
        alert('❌ Incorrect admin password');
        return;
      }
    }

    // Check for duplicate username (if someone else is already logged in with this name)
    const activeUsers = getActiveUsers();
    if (activeUsers.includes(name)) {
      alert(`❌ User "${name}" is already logged in. Please choose a different name or ask them to logout first.`);
      return;
    }

    const newUser: User = {
      name,
      createdAt: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('quizUser', JSON.stringify(newUser));
    addToActiveUsers(name);
  };

  const logout = () => {
    if (user) {
      removeFromActiveUsers(user.name);
    }
    setUser(null);
    localStorage.removeItem('quizUser');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
