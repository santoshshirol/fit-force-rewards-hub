
// User auth type
interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
}

// Save user to localStorage
export const saveUser = (user: AuthUser): void => {
  localStorage.setItem('authUser', JSON.stringify(user));
};

// Get user from localStorage
export const getUser = (): AuthUser | null => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};

// Remove user from localStorage
export const removeUser = (): void => {
  localStorage.setItem('authUser', '');
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!getUser();
};

// Mock login function (replace with real API in production)
export const loginUser = async (email: string, password: string): Promise<AuthUser> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes only - in a real app, this would call an API
  if (email && password.length > 3) {
    const user = {
      id: 'user-1',
      email: email,
      name: email.split('@')[0],
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2)
    };
    
    saveUser(user);
    return user;
  }
  
  throw new Error('Invalid credentials');
};

// Mock signup function (replace with real API in production)
export const signupUser = async (
  email: string, 
  password: string, 
  name: string, 
  department: string
): Promise<AuthUser> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes only
  if (email && password.length > 3) {
    const user = {
      id: 'user-' + Math.random().toString(36).substring(2),
      email: email,
      name: name || email.split('@')[0],
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2)
    };
    
    saveUser(user);
    return user;
  }
  
  throw new Error('Invalid signup information');
};

// Mock logout function
export const logoutUser = (): void => {
  removeUser();
};
