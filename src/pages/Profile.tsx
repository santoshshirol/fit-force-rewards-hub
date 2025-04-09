
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { currentUser } from "@/utils/mockData";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuth } from "@/context/AuthContext";

const activityData = [
  { name: "Mon", steps: 9500, workout: 1, sleep: 7.5 },
  { name: "Tue", steps: 11200, workout: 0, sleep: 8 },
  { name: "Wed", steps: 6800, workout: 1, sleep: 6.5 },
  { name: "Thu", steps: 10300, workout: 0, sleep: 7 },
  { name: "Fri", steps: 8900, workout: 1, sleep: 7.5 },
  { name: "Sat", steps: 7200, workout: 1, sleep: 8.5 },
  { name: "Sun", steps: 9100, workout: 0, sleep: 8 },
];

const pointsDistribution = [
  { name: "Steps", value: 450 },
  { name: "Water", value: 280 },
  { name: "Workout", value: 300 },
  { name: "Sleep", value: 180 },
  { name: "Meditation", value: 40 },
];

const COLORS = ["#9b87f5", "#F97316", "#10b981", "#3b82f6", "#f43f5e"];

const Profile = () => {
  const { toast } = useToast();
  const { user, updateUserInfo, changePassword } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Mock data for displays
  const userPoints = 1250;
  const userLevel = 3;
  const joinedDate = new Date('2023-10-15').toISOString();
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateUserInfo({
        name,
        email,
        department
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "There was an error updating your profile information.",
        variant: "destructive"
      });
    }
  };
  
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await changePassword(currentPassword, newPassword);
      
      toast({
        title: "Password changed",
        description: "Your password has been updated successfully.",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "Error changing password",
        description: "There was an error changing your password. Please check your current password.",
        variant: "destructive"
      });
    }
  };
  
  // Use custom avatar URL or generate from user ID
  const avatarUrl = user?.id 
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.id}` 
    : currentUser.avatarUrl;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and view your progress
          </p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your personal and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-lg">{user?.name || 'User'}</h3>
                      <p className="text-muted-foreground">{user?.department || 'Department'}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Member since {format(new Date(joinedDate), "MMMM yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Email</span>
                      <span>{user?.email || 'email@example.com'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Total Points</span>
                      <span className="font-medium text-fitness-purple">{userPoints} pts</span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Current Level</span>
                      <span>Level {userLevel}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Department</span>
                      <span>{user?.department || 'Department'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                  <CardDescription>
                    Distribution of your points by activity type
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pointsDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pointsDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} points`, ""]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>
                  Your activity trends for the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#9b87f5" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="steps" name="Steps" fill="#9b87f5" />
                    <Bar yAxisId="right" dataKey="sleep" name="Sleep (hours)" fill="#10b981" />
                    <Bar yAxisId="right" dataKey="workout" name="Workouts" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42</div>
                  <p className="text-muted-foreground text-sm">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Avg. Daily Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">9,014</div>
                  <p className="text-muted-foreground text-sm">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Avg. Sleep</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7.5h</div>
                  <p className="text-muted-foreground text-sm">Last 30 days</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="bg-fitness-purple hover:bg-fitness-purple/90">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="bg-fitness-purple hover:bg-fitness-purple/90">
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
