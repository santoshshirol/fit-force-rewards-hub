
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getUserGoals } from "@/utils/goalsData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface GoalsWidgetProps {
  userId: string;
}

const GoalsWidget = ({ userId }: GoalsWidgetProps) => {
  // Get user goals
  const userGoals = getUserGoals(userId);
  
  // Calculate stats
  const totalGoals = userGoals.length;
  const completedGoals = userGoals.filter(goal => goal.status === "completed").length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  
  // Get upcoming goals (sorted by end date)
  const upcomingGoals = [...userGoals]
    .filter(goal => goal.status !== "completed" && goal.status !== "failed")
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 2);
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Health & Performance Goals</CardTitle>
          <Link to="/goals">
            <Button variant="ghost" className="flex items-center text-sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Completion</span>
              <span className="font-medium">{completedGoals}/{totalGoals} Goals</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
          
          {/* Upcoming goals */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Upcoming Goals</h4>
            {upcomingGoals.length > 0 ? (
              <div className="space-y-2">
                {upcomingGoals.map(goal => (
                  <div 
                    key={goal.id} 
                    className="p-3 border rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-medium text-sm">{goal.title}</h5>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        goal.priority === "high" ? "bg-red-100 text-red-800" :
                        goal.priority === "medium" ? "bg-amber-100 text-amber-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{`${goal.currentValue}/${goal.targetValue} ${goal.unit}`}</span>
                      </div>
                      <Progress 
                        value={(goal.currentValue / goal.targetValue) * 100} 
                        className="h-1.5" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming goals</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsWidget;
