
import { Goal } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Award, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface GoalDetailDialogProps {
  goal: Goal;
  open: boolean;
  onClose: () => void;
}

const GoalDetailDialog = ({ goal, open, onClose }: GoalDetailDialogProps) => {
  // Calculate progress percentage
  const progressPercentage = (goal.currentValue / goal.targetValue) * 100;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{goal.title}</DialogTitle>
          <DialogDescription>
            Goal details and progress tracking
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Status badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={
              goal.status === "completed" ? "default" :
              goal.status === "in-progress" ? "secondary" :
              goal.status === "not-started" ? "outline" : "destructive"
            }>
              {goal.status === "in-progress" ? "In Progress" : 
               goal.status === "not-started" ? "Not Started" : 
               goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
            </Badge>
          </div>
          
          {/* Description */}
          <div>
            <h4 className="text-sm font-medium mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          </div>
          
          {/* Progress */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <h4 className="font-medium">Progress</h4>
              <span>{`${goal.currentValue}/${goal.targetValue} ${goal.unit}`}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-1" />
            <p className="text-xs text-muted-foreground">{progressPercentage.toFixed(0)}% complete</p>
          </div>
          
          <Separator />
          
          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Category</h4>
              <p className="text-sm text-muted-foreground">{goal.category}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Priority</h4>
              <p className="text-sm text-muted-foreground capitalize">{goal.priority}</p>
            </div>
          </div>
          
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Start Date</h4>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(goal.startDate), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">End Date</h4>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(goal.endDate), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Manager notes */}
          {goal.managerNotes && (
            <div>
              <h4 className="text-sm font-medium mb-1">Manager Notes</h4>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p className="text-muted-foreground">{goal.managerNotes}</p>
              </div>
            </div>
          )}
          
          {/* Health bonus eligibility */}
          <div className="flex items-center space-x-2">
            {goal.healthBonusEligible ? (
              <>
                <Award className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-600">
                  Eligible for Health Bonus
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Not eligible for Health Bonus
                </span>
              </>
            )}
          </div>
          
          {/* Performance impact notice */}
          <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <p>This goal's completion status will directly impact your annual performance evaluation.</p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated: {format(new Date(goal.updatedAt), "MMM d, yyyy")}</span>
          </div>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GoalDetailDialog;
