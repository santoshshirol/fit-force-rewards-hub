
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUser, isLoggedIn, loginUser, logoutUser, signupUser, updateUser, updatePassword } from "@/services/authService";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
  department?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, department: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUserInfo: (userData: Partial<AuthUser>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}

// Default demo user
const demoUser: AuthUser = {
  id: 'demo-user-1',
  email: 'demo@fitforce.com',
  name: 'Demo User',
  token: 'demo-token',
  department: 'Engineering'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(demoUser);
  const [isLoading, setIsLoading] = useState(false);
  
  // Always return demo user as logged in
  useEffect(() => {
    setUser(demoUser);
  }, []);
  
  const login = async (email: string, password: string) => {
    setUser(demoUser);
  };
  
  const signup = async (email: string, password: string, name: string, department: string) => {
    setUser(demoUser);
  };
  
  const logout = () => {
    // In demo mode, don't actually log out
    console.log('Logout clicked in demo mode');
  };

  const updateUserInfo = async (userData: Partial<AuthUser>) => {
    setUser({ ...demoUser, ...userData });
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    return true;
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: true, // Always authenticated in demo mode
        login, 
        signup, 
        logout, 
        isLoading,
        updateUserInfo,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
