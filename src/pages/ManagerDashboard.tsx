
import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, ChevronRight, Users, Shield, TrendingUp, Target,
  Trophy, Star, Medal, CheckCircle2, Clock, AlertCircle,
  ArrowUpRight, Bell, FileBarChart, Calendar
} from "lucide-react";
import { getDirectReports, getTeamHealthStatus, getUserGoals } from "@/utils/goalsData";
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

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  
  // Get manager's direct reports
  const directReportIds = user ? getDirectReports(user.id) : [];
  const teamHealthStats = user ? getTeamHealthStatus(user.id) : [];
  
  // Get direct report user objects
  const directReports = mockUsers.filter(u => directReportIds.includes(u.id));
  
  // Generate random team statistics that remain stable
  const randomStats = useMemo(() => {
    // Generate random completion rates for each team member (70-95%)
    const randomCompletionRates = directReportIds.map(() => Math.floor(Math.random() * 25) + 70);
    
    // Generate random bonus eligibility rates (65-95%)
    const randomBonusEligibility = directReportIds.map(() => Math.floor(Math.random() * 30) + 65);
    
    // Generate random goals completed (3-8 per person)
    const randomGoalsCompleted = directReportIds.map(() => Math.floor(Math.random() * 5) + 3);
    
    // Generate random high priority goals completed (1-4 per person)
    const randomHighPriorityCompleted = Math.floor(Math.random() * 3) + directReportIds.length;
    
    // Generate random team members eligible for bonus
    const randomEligibleCount = Math.floor(Math.random() * 3) + Math.floor(directReportIds.length / 2);
    
    return {
      completionRates: randomCompletionRates,
      bonusEligibility: randomBonusEligibility,
      goalsCompleted: randomGoalsCompleted,
      highPriorityCompleted: randomHighPriorityCompleted,
      eligibleCount: randomEligibleCount,
      teamCompletionRate: Math.floor(Math.random() * 20) + 75, // 75-95%
      teamBonusEligibility: Math.floor(Math.random() * 15) + 80, // 80-95%
      teamTotalGoals: Math.floor(Math.random() * 20) + 30, // 30-50 total goals
      emergencyInSights: [
        {
          name: "Devendra",
          message: "No activity for the past week",
          status: "warning"
        },
        {
          name: "Nagarjun",
          message: "Missed 3 consecutive goals",
          status: "alert"
        }
      ],
      upcomingReviews: [
        {
          name: "Santosh",
          date: "May 15, 2025",
          type: "Quarterly"
        },
        {
          name: "Priya",
          date: "May 20, 2025",
          type: "Health Check-in"
        }
      ]
    };
  }, [directReportIds.length]);
  
  // Calculate team averages (using the random values)
  const teamCompletionRate = randomStats.teamCompletionRate;
  const teamBonusEligibility = randomStats.teamBonusEligibility;
  
  // Team achievements - count completed goals across team
  const totalCompletedGoals = directReportIds.reduce((sum, _, index) => sum + randomStats.goalsCompleted[index], 0);
  const highPriorityGoalsCompleted = randomStats.highPriorityCompleted;
  
  // Count team members eligible for health bonus
  const teamMembersEligibleForBonus = randomStats.eligibleCount;
  
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
            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 px-3 py-1.5">
              <Trophy className="w-4 h-4 mr-1" />
              Team Achievement Leader
            </Badge>
            
            <Button size="sm" variant="outline" className="gap-1 ml-2">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </div>
        </div>
        
        {/* Team Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Team Achievements */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 overflow-hidden">
            <CardHeader className="pb-2 border-b border-indigo-100">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-indigo-900">Team Achievements</CardTitle>
                <FileBarChart className="h-5 w-5 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
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
                    <h3 className="text-2xl font-bold">{teamBonusEligibility}%</h3>
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
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-sm">Team Progress</h4>
                  <span className="text-sm font-semibold">{teamCompletionRate}%</span>
                </div>
                <Progress value={teamCompletionRate} className="h-2" />
                <p className="text-xs mt-1 text-muted-foreground">
                  {randomStats.teamTotalGoals} total goals across team
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Right column - Actionable Insights */}
          <Card>
            <CardHeader className="pb-2 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Action Center</CardTitle>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm flex items-center mb-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                    Attention Required
                  </h4>
                  {randomStats.emergencyInSights.map((insight, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-amber-50 rounded-md mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-sm">{insight.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {insight.message}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 text-xs">
                        Check
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="font-medium text-sm flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                    Upcoming Reviews
                  </h4>
                  {randomStats.upcomingReviews.map((review, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-blue-50 rounded-md mb-2">
                      <div className="flex items-center">
                        <span className="font-medium text-sm">{review.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {review.type} • {review.date}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 text-xs">
                        Prepare
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full text-sm">
                    View All Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Additional team insights */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{directReports.length}</div>
              <div className="flex -space-x-2 mt-2">
                {directReports.slice(0, 5).map(member => (
                  <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
                {directReports.length > 5 && (
                  <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                    +{directReports.length - 5}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Goal Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamCompletionRate}%</div>
              <Progress value={teamCompletionRate} className="h-2 mt-2" />
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span>5% increase from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Health Bonus Eligible</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamMembersEligibleForBonus} team members</div>
              <div className="flex mt-2 gap-1">
                {Array(teamMembersEligibleForBonus).fill(0).map((_, i) => (
                  <div key={i} className="h-2 flex-1 rounded-full bg-amber-500"></div>
                ))}
                {Array(directReports.length - teamMembersEligibleForBonus).fill(0).map((_, i) => (
                  <div key={i} className="h-2 flex-1 rounded-full bg-gray-200"></div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {((teamMembersEligibleForBonus / directReports.length) * 100).toFixed(0)}% of team
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Performing Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topCategory.category}</div>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-amber-400 mr-1" />
                <span className="text-xs">{topCategory.rate.toFixed(0)}% completion rate</span>
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Medal className="h-3 w-3 text-purple-500 mr-1" />
                <span>Strongest team performance area</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Team members and their goals */}
        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Team Overview</TabsTrigger>
            <TabsTrigger value="details">Individual Details</TabsTrigger>
            <TabsTrigger value="achievements">Team Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle>Team Health & Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {teamHealthStats.map((stats, index) => {
                    const teamMember = mockUsers.find(u => u.id === stats.userId);
                    if (!teamMember) return null;
                    
                    // Use random completion rate and bonus eligibility for each team member
                    const randomCompletionRate = randomStats.completionRates[index];
                    const randomBonusEligibility = randomStats.bonusEligibility[index];
                    const randomCompletedGoals = randomStats.goalsCompleted[index];
                    
                    const statusColors = {
                      high: "bg-green-500",
                      medium: "bg-amber-500",
                      low: "bg-red-500"
                    };
                    
                    const statusLevel = randomCompletionRate >= 85 ? "high" : randomCompletionRate >= 70 ? "medium" : "low";
                    
                    return (
                      <div key={teamMember.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between p-4 bg-white border-b">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={teamMember.avatarUrl} alt={teamMember.name} />
                                <AvatarFallback>{teamMember.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${statusColors[statusLevel as keyof typeof statusColors]}`}></div>
                            </div>
                            <div>
                              <h3 className="font-medium">{teamMember.name}</h3>
                              <p className="text-xs text-muted-foreground">{teamMember.department}</p>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-right">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                randomBonusEligibility >= 75 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {randomBonusEligibility >= 75 ? (
                                  <>
                                    <Award className="mr-1 h-3 w-3" />
                                    Eligible
                                  </>
                                ) : (
                                  <>Not Yet Eligible</>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Goal Completion</span>
                              <span className="font-medium">{randomCompletionRate}%</span>
                            </div>
                            <Progress value={randomCompletionRate} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div className="bg-green-50 p-2 rounded-md">
                              <div className="font-medium text-green-700">{randomCompletedGoals}</div>
                              <div className="text-xs text-green-600">Completed</div>
                            </div>
                            <div className="bg-blue-50 p-2 rounded-md">
                              <div className="font-medium text-blue-700">{stats.inProgressGoals}</div>
                              <div className="text-xs text-blue-600">In Progress</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md">
                              <div className="font-medium text-gray-700">{stats.totalGoals - randomCompletedGoals - stats.inProgressGoals}</div>
                              <div className="text-xs text-gray-600">Not Started</div>
                            </div>
                          </div>
                          
                          <div className="pt-2">
                            <Link to={`/goals?userId=${teamMember.id}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                View Details <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle>Team Member Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 pt-4">
                  {directReports.map((member, index) => (
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <div className="flex items-center">
                            <p className="text-sm text-muted-foreground">{member.department}</p>
                            
                            {/* Random status badges */}
                            {index % 3 === 0 && (
                              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 text-xs py-0.5">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> On Track
                              </Badge>
                            )}
                            {index % 3 === 1 && (
                              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 text-xs py-0.5">
                                <Clock className="w-3 h-3 mr-1" /> Needs Review
                              </Badge>
                            )}
                            {index % 3 === 2 && (
                              <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 text-xs py-0.5">
                                <AlertCircle className="w-3 h-3 mr-1" /> Attention
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-right hidden md:block">
                          <div className="text-sm font-medium">{randomStats.completionRates[index]}% Complete</div>
                          <div className="text-xs text-muted-foreground">
                            {randomStats.goalsCompleted[index]} goals completed
                          </div>
                        </div>
                        <Link to={`/goals?userId=${member.id}`}>
                          <Button variant="outline" size="sm">
                            View Goals <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-0">
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle>Team Health Goal Achievements</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Member</TableHead>
                      <TableHead>Completed Goals</TableHead>
                      <TableHead>Health Bonus</TableHead>
                      <TableHead>Top Achievement</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamHealthStats.map((stats, index) => {
                      const teamMember = mockUsers.find(u => u.id === stats.userId);
                      if (!teamMember) return null;
                      
                      // Use random values for this team member
                      const randomCompletedGoals = randomStats.goalsCompleted[index];
                      const randomBonusEligibility = randomStats.bonusEligibility[index];
                      
                      // Get top/most recent completed goal
                      const userGoals = getUserGoals(teamMember.id);
                      const completedGoals = userGoals.filter(g => g.status === "completed");
                      const topGoal = completedGoals.length > 0 
                        ? completedGoals.sort((a, b) => 
                            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0]
                        : null;
                      
                      return (
                        <TableRow key={teamMember.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={teamMember.avatarUrl} alt={teamMember.name} />
                                <AvatarFallback>{teamMember.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{teamMember.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{randomCompletedGoals} goals</div>
                            <div className="text-xs text-muted-foreground">{Math.round(randomCompletionRate * 100) / 100}% completion rate</div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              randomBonusEligibility >= 75 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {randomBonusEligibility >= 75 ? (
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
                            {randomCompletedGoals > 0 ? (
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
    </Layout>
  );
};

export default ManagerDashboard;
