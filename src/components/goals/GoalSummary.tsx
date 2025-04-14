
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateHealthBonusEligibility, getUserGoals } from "@/utils/goalsData";
import { Target, Award, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface GoalSummaryProps {
  userId: string;
}

const GoalSummary = ({ userId }: GoalSummaryProps) => {
  // Get goals for user
  const userGoals = getUserGoals(userId);
  
  // Calculate completion percentages with some randomization
  const totalGoals = userGoals.length;
  const completedGoals = userGoals.filter(goal => goal.status === "completed").length;
  const inProgressGoals = userGoals.filter(goal => goal.status === "in-progress").length;
  const notStartedGoals = userGoals.filter(goal => goal.status === "not-started").length;
  
  // Use useMemo to generate random numbers that stay consistent during renders
  const randomData = useMemo(() => {
    // Random completion percentage between 55-95%
    const randCompletionPercentage = Math.floor(Math.random() * 40) + 55;
    
    // Random health bonus percentage between 65-95%
    const randHealthBonus = Math.floor(Math.random() * 30) + 65;
    
    return {
      completionPercentage: randCompletionPercentage,
      healthBonusPercentage: randHealthBonus
    };
  }, [userId]);
  
  // Calculate category-wise completion
  const categories = ["Physical Health", "Mental Health", "Nutrition"];
  const categoryCompletions = categories.map(category => {
    const categoryGoals = userGoals.filter(g => g.category === category);
    const completed = categoryGoals.filter(g => g.status === "completed").length;
    const total = categoryGoals.length;
    
    // Add some randomness to category percentages (between 40-100%)
    const randomPercentage = Math.floor(Math.random() * 60) + 40;
    const percentage = total > 0 ? randomPercentage : 0;
    
    return { category, completed, total, percentage };
  });
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-blue-50/50">
            <CardTitle className="text-sm font-medium">Goal Completion</CardTitle>
            <Target className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{randomData.completionPercentage}%</div>
            <Progress
              value={randomData.completionPercentage}
              className="h-2 mt-2 bg-blue-100"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {completedGoals} completed, {inProgressGoals} in progress, {notStartedGoals} not started
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-green-50/50">
            <CardTitle className="text-sm font-medium">Health Bonus Eligibility</CardTitle>
            <Award className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{randomData.healthBonusPercentage}%</div>
            <Progress
              value={randomData.healthBonusPercentage}
              className={cn(
                "h-2 mt-2",
                randomData.healthBonusPercentage >= 75 ? "bg-green-500" : "bg-amber-500"
              )}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {randomData.healthBonusPercentage >= 75 
                ? "You're on track for the health bonus!" 
                : "Complete more health goals to qualify"
              }
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-purple-50/50">
            <CardTitle className="text-sm font-medium">Performance Impact</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">Positive</div>
              <div className={`px-2.5 py-0.5 rounded-full text-xs ${
                randomData.completionPercentage >= 70 
                  ? "bg-green-100 text-green-800" 
                  : randomData.completionPercentage >= 40 
                    ? "bg-amber-100 text-amber-800" 
                    : "bg-red-100 text-red-800"
              }`}>
                {randomData.completionPercentage >= 70 
                  ? "High Impact" 
                  : randomData.completionPercentage >= 40 
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
          <Card key={cat.category} className={`overflow-hidden border-t-4 ${
            cat.category === "Physical Health" 
              ? "border-t-blue-500" 
              : cat.category === "Mental Health" 
                ? "border-t-purple-500" 
                : "border-t-green-500"
          }`}>
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
                className={`h-2 ${
                  cat.category === "Physical Health" 
                    ? "bg-blue-100" 
                    : cat.category === "Mental Health" 
                      ? "bg-purple-100" 
                      : "bg-green-100"
                }`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalSummary;
