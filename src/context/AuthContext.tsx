
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await loginUser(email, password);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name: string, department: string) => {
    setIsLoading(true);
    try {
      const user = await signupUser(email, password, name, department);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateUserInfo = async (userData: Partial<AuthUser>) => {
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(userData);
      setUser(updatedUser);
      return updatedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      return await updatePassword(currentPassword, newPassword);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
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
