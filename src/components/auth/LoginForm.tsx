
import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [namePromptOpen, setNamePromptOpen] = useState(false);
  const [promptedName, setPromptedName] = useState("");
  
  const { login, signup, isLoading, user, updateUserInfo } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: "Logged in successfully",
        description: "Welcome back to FitForce!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name || !department) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signup(email, password, name, department);
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different information.",
        variant: "destructive",
      });
    }
  };
  
  const handleNameSubmit = async () => {
    try {
      if (promptedName.trim() !== "") {
        await updateUserInfo({ name: promptedName });
        toast({
          title: "Name updated",
          description: "Your name has been updated successfully!",
        });
      }
      setNamePromptOpen(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Could not update your name. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Check if user logged in and name is missing
  useEffect(() => {
    if (user && (!user.name || user.name === "" || user.name === user.email?.split('@')[0])) {
      setNamePromptOpen(true);
    }
  }, [user]);
  
  return (
    <>
      <Dialog open={namePromptOpen} onOpenChange={setNamePromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to FitForce!</DialogTitle>
            <DialogDescription>
              Please tell us your name so we can personalize your experience.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="prompted-name">Your Name</Label>
              <Input 
                id="prompted-name" 
                placeholder="John Doe" 
                value={promptedName} 
                onChange={(e) => setPromptedName(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleNameSubmit} disabled={!promptedName.trim()}>
              Save Name
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full fitness-gradient flex items-center justify-center">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold">FitForce</h1>
          <p className="mt-2 text-muted-foreground">
            Track your fitness activities and earn rewards
          </p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-fitness-purple hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-fitness-purple hover:bg-fitness-purple/90" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Work Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g. Marketing, Engineering, HR"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-fitness-purple hover:bg-fitness-purple/90" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm text-muted-foreground">
          By using FitForce, you agree to our{" "}
          <a href="#" className="text-fitness-purple hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-fitness-purple hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </>
  );
};

export default LoginForm;
