
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Home, LogOut, Settings, User, Activity, Award, Target, BarChart } from "lucide-react";
import NamePromptDialog from "./auth/NamePromptDialog";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // We need to handle auth redirect in useEffect to avoid React warnings
  // and only redirect if the component is mounted
  const handleAuth = () => {
    if (!isAuthenticated) {
      // We'll let React handle this properly in an effect
      navigate("/");
      return null;
    }
    return true;
  };

  const isAuthOk = handleAuth();
  if (!isAuthOk) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Menu items for the sidebar
  const menuItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Activities", icon: Activity, path: "/activities" },
    { title: "Leaderboard", icon: Award, path: "/leaderboard" },
    { title: "Goals", icon: Target, path: "/goals" },
    { title: "Rewards", icon: Award, path: "/rewards" },
    { title: "Manager", icon: BarChart, path: "/manager" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          {/* Sidebar */}
          <Sidebar>
            <SidebarContent>
              <div className="p-4">
                <h2 className="text-xl font-bold text-center">FitForce</h2>
              </div>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <Link to={item.path}>
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}

                    {/* Logout button at the bottom of navigation */}
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
              <div className="h-16 px-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                  FitForce
                </h1>
                <div className="flex items-center">
                  {user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name || user.email}`} alt={user.name || "User"} />
                            <AvatarFallback>{user.name?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.name || "User"}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="container mx-auto p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>

      {/* Name prompt dialog */}
      <NamePromptDialog />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Layout;
