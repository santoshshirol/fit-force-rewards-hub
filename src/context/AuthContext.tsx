
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUser, isLoggedIn, loginUser, logoutUser, signupUser } from "@/services/authService";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, department: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
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
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout, 
        isLoading 
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
