
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateHealthBonusEligibility, getUserGoals } from "@/utils/goalsData";
import { Target, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalSummaryProps {
  userId: string;
}

const GoalSummary = ({ userId }: GoalSummaryProps) => {
  // Get goals for user
  const userGoals = getUserGoals(userId);
  
  // Calculate completion percentages
  const totalGoals = userGoals.length;
  const completedGoals = userGoals.filter(goal => goal.status === "completed").length;
  const inProgressGoals = userGoals.filter(goal => goal.status === "in-progress").length;
  const notStartedGoals = userGoals.filter(goal => goal.status === "not-started").length;
  
  // Calculate goal progress percentage
  const calculatedCompletionPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  
  // Calculate progress for in-progress goals
  const inProgressAvgCompletion = userGoals
    .filter(goal => goal.status === "in-progress")
    .reduce((sum, goal) => sum + (goal.currentValue / goal.targetValue), 0);
  
  const inProgressCompletionPercentage = inProgressGoals > 0 
    ? (inProgressAvgCompletion / inProgressGoals) * 100 
    : 0;
  
  // Total completion combines completed goals and partial progress of in-progress goals
  const totalCompletionPercentage = totalGoals > 0
    ? ((completedGoals * 100) + (inProgressCompletionPercentage * inProgressGoals / 100)) / totalGoals
    : 0;
  
  // Ensure we have a meaningful value for demonstration
  const completionPercentage = Math.max(5, totalCompletionPercentage);
  
  // Calculate health bonus eligibility
  const calculatedHealthBonusPercentage = calculateHealthBonusEligibility(userId);
  const healthBonusPercentage = Math.max(5, calculatedHealthBonusPercentage);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Goal Completion</CardTitle>
          <Target className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionPercentage.toFixed(0)}%</div>
          <Progress
            value={completionPercentage}
            className="h-2 mt-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {completedGoals} completed, {inProgressGoals} in progress, {notStartedGoals} not started
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Health Bonus Eligibility</CardTitle>
          <Award className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{healthBonusPercentage.toFixed(0)}%</div>
          <Progress
            value={healthBonusPercentage}
            className={cn(
              "h-2 mt-2",
              healthBonusPercentage >= 75 ? "bg-green-500" : "bg-amber-500"
            )}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {healthBonusPercentage >= 75 
              ? "You're on track for the health bonus!" 
              : "Complete more health goals to qualify"
            }
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Performance Impact</CardTitle>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">Positive</div>
            <div className={`px-2.5 py-0.5 rounded-full text-xs ${
              completionPercentage >= 70 
                ? "bg-green-100 text-green-800" 
                : completionPercentage >= 40 
                  ? "bg-amber-100 text-amber-800" 
                  : "bg-red-100 text-red-800"
            }`}>
              {completionPercentage >= 70 
                ? "High Impact" 
                : completionPercentage >= 40 
                  ? "Medium Impact" 
                  : "Low Impact"
              }
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Goal achievement directly impacts your annual performance review
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalSummary;
