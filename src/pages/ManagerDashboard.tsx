
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Award, ChevronRight, Users } from "lucide-react";
import { getDirectReports, getTeamHealthStatus } from "@/utils/goalsData";
import { mockUsers } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  
  // Get manager's direct reports (for demo, we'll use Subhransu as the manager)
  const directReportIds = user ? getDirectReports(user.id) : [];
  const teamHealthStats = user ? getTeamHealthStatus(user.id) : [];
  
  // Get direct report user objects
  const directReports = mockUsers.filter(u => directReportIds.includes(u.id));
  
  // Calculate team averages
  const teamCompletionRate = teamHealthStats.length > 0 
    ? teamHealthStats.reduce((sum, member) => sum + member.completionRate, 0) / teamHealthStats.length 
    : 0;
    
  const teamBonusEligibility = teamHealthStats.length > 0 
    ? teamHealthStats.reduce((sum, member) => sum + member.healthBonusEligibility, 0) / teamHealthStats.length 
    : 0;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Manager Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your team's health and performance goals
          </p>
        </div>
        
        {/* Manager stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{directReports.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Direct reports</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Goal Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamCompletionRate.toFixed(0)}%</div>
              <Progress value={teamCompletionRate} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Health Bonus Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamBonusEligibility.toFixed(0)}%</div>
              <Progress 
                value={teamBonusEligibility} 
                className={`h-2 mt-2 ${teamBonusEligibility >= 75 ? "bg-green-500" : "bg-amber-500"}`} 
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Team members and their goals */}
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="overview">Team Overview</TabsTrigger>
            <TabsTrigger value="details">Individual Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Team Health & Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamHealthStats.map((stats, index) => {
                    const teamMember = mockUsers.find(u => u.id === stats.userId);
                    if (!teamMember) return null;
                    
                    return (
                      <div key={teamMember.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={teamMember.avatarUrl} alt={teamMember.name} />
                              <AvatarFallback>{teamMember.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{teamMember.name}</h3>
                              <p className="text-sm text-muted-foreground">{teamMember.department}</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-right">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-xs ${
                                stats.healthBonusEligibility >= 75 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {stats.healthBonusEligibility.toFixed(0)}% Eligible
                                {stats.healthBonusEligibility >= 75 && (
                                  <Award className="w-3 h-3 ml-1 inline" />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Goal Completion</span>
                              <span>{stats.completedGoals}/{stats.totalGoals} Goals</span>
                            </div>
                            <Progress value={stats.completionRate} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="font-medium">{stats.completedGoals}</div>
                              <div className="text-xs text-muted-foreground">Completed</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="font-medium">{stats.inProgressGoals}</div>
                              <div className="text-xs text-muted-foreground">In Progress</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="font-medium">{stats.totalGoals - stats.completedGoals - stats.inProgressGoals}</div>
                              <div className="text-xs text-muted-foreground">Not Started</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Team Member Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {directReports.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.department}</p>
                        </div>
                      </div>
                      
                      <Link to={`/goals?userId=${member.id}`}>
                        <Button variant="outline" size="sm">
                          View Goals <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
