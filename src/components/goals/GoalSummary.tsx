
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
  
  const completionPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  const healthBonusPercentage = calculateHealthBonusEligibility(userId);
  
  // Calculate category-wise completion
  const categories = ["Physical Health", "Mental Health", "Nutrition"];
  const categoryCompletions = categories.map(category => {
    const categoryGoals = userGoals.filter(g => g.category === category);
    const completed = categoryGoals.filter(g => g.status === "completed").length;
    const total = categoryGoals.length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { category, completed, total, percentage };
  });
  
  return (
    <div className="space-y-6">
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
      
      {/* Category-wise completion */}
      <div className="grid gap-4 md:grid-cols-3">
        {categoryCompletions.map((cat) => (
          <Card key={cat.category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{cat.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-1 text-sm">
                <span>{cat.completed} of {cat.total} goals completed</span>
                <span>{cat.percentage.toFixed(0)}%</span>
              </div>
              <Progress
                value={cat.percentage}
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalSummary;
