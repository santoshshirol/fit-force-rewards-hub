
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, ChevronRight, Users, Shield, 
  TrendingUp, Target, Trophy, Star, Medal,
  BarChart3, Eye, ListChecks, Activity
} from "lucide-react";
import { getDirectReports, getTeamHealthStatus, getUserGoals, getGoalStatsByCategory } from "@/utils/goalsData";
import { mockUsers } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Goal } from "@/types";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [viewingCategory, setViewingCategory] = useState<string | null>(null);
  
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
  
  // Team achievements - count completed goals across team
  const totalCompletedGoals = teamHealthStats.reduce((sum, member) => sum + member.completedGoals, 0);
  const highPriorityGoalsCompleted = directReportIds.reduce((count, userId) => {
    const userGoals = getUserGoals(userId);
    return count + userGoals.filter(g => g.status === "completed" && g.priority === "high").length;
  }, 0);
  
  // Count team members eligible for health bonus
  const teamMembersEligibleForBonus = teamHealthStats.filter(stats => stats.healthBonusEligibility >= 75).length;
  
  // Calculate top performing categories
  const goalsByCategory = directReportIds.reduce((categories: Record<string, {total: number, completed: number}>, userId) => {
    const userGoals = getUserGoals(userId);
    userGoals.forEach(goal => {
      if (!categories[goal.category]) {
        categories[goal.category] = { total: 0, completed: 0 };
      }
      categories[goal.category].total += 1;
      if (goal.status === "completed") {
        categories[goal.category].completed += 1;
      }
    });
    return categories;
  }, {});
  
  // Find top category
  const topCategory = Object.entries(goalsByCategory).reduce((top, [category, stats]) => {
    const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
    return completionRate > top.rate ? { category, rate: completionRate } : top;
  }, { category: "None", rate: 0 });
  
  // Get selected team member's details
  const selectedMember = selectedTeamMember 
    ? mockUsers.find(u => u.id === selectedTeamMember) 
    : null;
    
  const selectedMemberGoals = selectedTeamMember 
    ? getUserGoals(selectedTeamMember).filter(goal => 
        !viewingCategory || goal.category === viewingCategory) 
    : [];
    
  const selectedMemberStats = selectedTeamMember 
    ? getGoalStatsByCategory(selectedTeamMember) 
    : [];
    
  // Handle team member selection
  const handleViewTeamMemberDetails = (userId: string) => {
    setSelectedTeamMember(userId);
    setDetailDialogOpen(true);
  };
  
  // Handle filter by category
  const handleFilterByCategory = (category: string | null) => {
    setViewingCategory(category);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manager Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your team's health and performance goals
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Trophy className="w-4 h-4 mr-1" />
              Team Achievement
            </div>
          </div>
        </div>
        
        {/* Team Achievements */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Goals Completed</p>
                  <h3 className="text-2xl font-bold">{totalCompletedGoals}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Bonus Eligibility</p>
                  <h3 className="text-2xl font-bold">{teamBonusEligibility.toFixed(0)}%</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority Completions</p>
                  <h3 className="text-2xl font-bold">{highPriorityGoalsCompleted}</h3>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Additional team insights */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <CardTitle className="text-sm font-medium">Health Bonus Eligible</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembersEligibleForBonus} team members</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((teamMembersEligibleForBonus / directReports.length) * 100).toFixed(0)}% of team
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Performing Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topCategory.category}</div>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-amber-400 mr-1" />
                <span className="text-xs">{topCategory.rate.toFixed(0)}% completion rate</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Team members and their goals */}
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="overview">Team Overview</TabsTrigger>
            <TabsTrigger value="details">Individual Details</TabsTrigger>
            <TabsTrigger value="achievements">Team Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Team Health & Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {teamHealthStats.map((stats) => {
                    const teamMember = mockUsers.find(u => u.id === stats.userId);
                    if (!teamMember) return null;
                    
                    return (
                      <div 
                        key={teamMember.id} 
                        className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => handleViewTeamMemberDetails(teamMember.id)}
                      >
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
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-all cursor-pointer"
                      onClick={() => handleViewTeamMemberDetails(member.id)}
                    >
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
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleViewTeamMemberDetails(member.id);
                        }}>
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                        
                        <Link to={`/goals?userId=${member.id}`} onClick={(e) => e.stopPropagation()}>
                          <Button variant="outline" size="sm">
                            <ListChecks className="w-4 h-4 mr-1" />
                            Goals
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Team Health Goal Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Completed Goals</TableHead>
                      <TableHead>Health Bonus</TableHead>
                      <TableHead>Top Achievement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamHealthStats.map(stats => {
                      const teamMember = mockUsers.find(u => u.id === stats.userId);
                      if (!teamMember) return null;
                      
                      // Get top/most recent completed goal
                      const userGoals = getUserGoals(teamMember.id);
                      const completedGoals = userGoals.filter(g => g.status === "completed");
                      const topGoal = completedGoals.length > 0 
                        ? completedGoals.sort((a, b) => 
                            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]
                        : null;
                      
                      return (
                        <TableRow key={teamMember.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleViewTeamMemberDetails(teamMember.id)}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={teamMember.avatarUrl} alt={teamMember.name} />
                                <AvatarFallback>{teamMember.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{teamMember.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{stats.completedGoals} goals</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              stats.healthBonusEligibility >= 75 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {stats.healthBonusEligibility >= 75 ? (
                                <>
                                  <Award className="mr-1 h-3 w-3" />
                                  Eligible
                                </>
                              ) : (
                                <>Not Yet Eligible</>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {topGoal ? (
                              <div className="text-sm">
                                <p className="font-medium">{topGoal.title}</p>
                                <p className="text-xs text-muted-foreground">{topGoal.category}</p>
                              </div>
                            ) : (
                              "No completed goals"
                            )}
                          </TableCell>
                          <TableCell>
                            {stats.completedGoals > 0 ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <Medal className="w-3 h-3 mr-1" />
                                Active Achiever
                              </Badge>
                            ) : stats.inProgressGoals > 0 ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                In Progress
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                                Not Started
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewTeamMemberDetails(teamMember.id);
                                }}
                              >
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                              <Link to={`/goals?userId=${teamMember.id}`} onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <Activity className="h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Team Member Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedMember.avatarUrl} alt={selectedMember.name} />
                    <AvatarFallback>{selectedMember.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedMember.name}'s Health Goals</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedMember.department} Department</p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Health categories */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Goal Categories</h3>
                    <div className="flex space-x-2">
                      <Button 
                        variant={viewingCategory === null ? "secondary" : "outline"} 
                        size="sm" 
                        onClick={() => handleFilterByCategory(null)}
                      >
                        All
                      </Button>
                      <Button 
                        variant={viewingCategory === "Physical Health" ? "secondary" : "outline"} 
                        size="sm" 
                        onClick={() => handleFilterByCategory("Physical Health")}
                      >
                        Physical
                      </Button>
                      <Button 
                        variant={viewingCategory === "Mental Health" ? "secondary" : "outline"} 
                        size="sm" 
                        onClick={() => handleFilterByCategory("Mental Health")}
                      >
                        Mental
                      </Button>
                      <Button 
                        variant={viewingCategory === "Nutrition" ? "secondary" : "outline"} 
                        size="sm" 
                        onClick={() => handleFilterByCategory("Nutrition")}
                      >
                        Nutrition
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {selectedMemberStats.map(stat => (
                      <Card key={stat.category} className={viewingCategory === stat.category ? "border-primary" : ""}>
                        <CardContent className="pt-6">
                          <h4 className="font-semibold text-sm">{stat.category}</h4>
                          <div className="flex justify-between text-sm mt-2 mb-1">
                            <span>Completion</span>
                            <span>{stat.completed}/{stat.total} Goals</span>
                          </div>
                          <Progress 
                            value={stat.completionRate} 
                            className={`h-2 ${
                              stat.category === "Physical Health" ? "bg-blue-200" : 
                              stat.category === "Mental Health" ? "bg-purple-200" : 
                              "bg-green-200"
                            }`}
                          />
                          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                            <div className="bg-gray-50 rounded p-1 text-center">
                              <p className="text-muted-foreground">Completed</p>
                              <p className="font-medium">{stat.completed}</p>
                            </div>
                            <div className="bg-gray-50 rounded p-1 text-center">
                              <p className="text-muted-foreground">In Progress</p>
                              <p className="font-medium">{stat.inProgress}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Goals list */}
                <div className="space-y-3">
                  <h3 className="font-semibold">
                    {viewingCategory ? `${viewingCategory} Goals` : "All Goals"}
                  </h3>
                  {selectedMemberGoals.length > 0 ? (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                      {selectedMemberGoals.map(goal => (
                        <GoalListItem key={goal.id} goal={goal} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-6">
                      No {viewingCategory?.toLowerCase()} goals found for this team member.
                    </p>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                    Close
                  </Button>
                  <Link to={`/goals?userId=${selectedMember.id}`}>
                    <Button>
                      View All Goals
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

// Goal list item component
interface GoalListItemProps {
  goal: Goal;
}

const GoalListItem = ({ goal }: GoalListItemProps) => {
  // Calculate progress percentage
  const progress = (goal.currentValue / goal.targetValue) * 100;
  
  // Status classes
  const getStatusClass = () => {
    switch (goal.status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "not-started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="border rounded-md p-3 hover:border-blue-200 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{goal.title}</h4>
          <p className="text-sm text-muted-foreground">{goal.description}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass()}`}>
          {goal.status === "in-progress" ? "In Progress" : 
           goal.status === "not-started" ? "Not Started" :
           goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Progress: {goal.currentValue}/{goal.targetValue} {goal.unit}</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Target className="w-3 h-3 mr-1" />
          <span>Due: {new Date(goal.endDate).toLocaleDateString()}</span>
        </div>
        
        {goal.healthBonusEligible && (
          <div className="flex items-center text-amber-600">
            <Award className="w-3 h-3 mr-1" />
            <span>Bonus Eligible</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
