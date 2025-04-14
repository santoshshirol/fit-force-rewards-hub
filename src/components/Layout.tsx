import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { 
  Activity, 
  Award, 
  Home, 
  LogOut, 
  Menu, 
  ShoppingBag, 
  User as UserIcon, 
  X, 
  FootprintsIcon,
  Target,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/utils/mockData";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { logout, isAuthenticated, user } = useAuth();
  
  // If not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  // Get the current user's data - fallback to mock data for level and points
  const displayUser = {
    name: user?.name || 'User',
    avatarUrl: user?.id ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.id}` : currentUser.avatarUrl,
    level: currentUser.level,
    points: currentUser.points
  };

  // Define navigation items including the Manager Dashboard
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/activities", label: "Activities", icon: <FootprintsIcon className="w-5 h-5" /> },
    { path: "/goals", label: "Goals", icon: <Target className="w-5 h-5" /> },
    { path: "/rewards", label: "Rewards", icon: <ShoppingBag className="w-5 h-5" /> },
    { path: "/leaderboard", label: "Leaderboard", icon: <Award className="w-5 h-5" /> },
    { path: "/profile", label: "Profile", icon: <UserIcon className="w-5 h-5" /> },
    { path: "/manager", label: "Manager Dashboard", icon: <Users className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full fitness-gradient flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">FitForce</span>
            </Link>
            <button
              className="p-1 rounded-md lg:hidden text-gray-500 hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* User profile summary */}
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={displayUser.avatarUrl}
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{displayUser.name}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-500">Level {displayUser.level}</span>
                  <span className="text-xs mx-1 text-gray-400">•</span>
                  <span className="text-sm text-fitness-purple font-semibold">
                    {displayUser.points} pts
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 pt-4 pb-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-fitness-purple text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 text-gray-600"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white shadow-sm py-4 px-6 lg:hidden flex items-center justify-between">
          <button
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full fitness-gradient flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">FitForce</span>
          </Link>
          <div className="w-6 h-6" /> {/* Placeholder for alignment */}
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto py-6 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
