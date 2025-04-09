
import { Goal } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Award, Calendar } from "lucide-react";

interface GoalCardProps {
  goal: Goal;
  onViewDetails: () => void;
}

const GoalCard = ({ goal, onViewDetails }: GoalCardProps) => {
  // Calculate progress percentage
  const progressPercentage = (goal.currentValue / goal.targetValue) * 100;
  
  // Calculate days remaining
  const today = new Date();
  const endDate = new Date(goal.endDate);
  const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "not-started":
        return "bg-gray-100 text-gray-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Priority indicator color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(goal.priority)}`} />
              <span className="text-sm text-muted-foreground">
                {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
              </span>
            </div>
            <h3 className="font-semibold">{goal.title}</h3>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(goal.status)}`}>
            {goal.status === "in-progress" ? "In Progress" : 
             goal.status === "not-started" ? "Not Started" : 
             goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {goal.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{`${goal.currentValue}/${goal.targetValue} ${goal.unit}`}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{format(new Date(goal.endDate), "MMM d, yyyy")}</span>
            </div>
            <span>
              {daysRemaining > 0 
                ? `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining` 
                : "Due date passed"}
            </span>
          </div>
          
          {goal.healthBonusEligible && (
            <div className="flex items-center text-xs text-amber-600">
              <Award className="h-3 w-3 mr-1" />
              <span>Health Bonus Eligible</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full" onClick={onViewDetails}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
