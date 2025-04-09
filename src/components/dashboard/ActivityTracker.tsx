
import { useState } from "react";
import { activityTypes } from "@/utils/mockData";
import ActivityCard from "@/components/ui/ActivityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const ActivityTracker = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(activityTypes[0]);
  const [activityValue, setActivityValue] = useState("");
  const { toast } = useToast();
  
  // Mock activity data - in a real app, this would come from API or state
  const mockActivityValues = {
    steps: 6450,
    water: 5,
    workout: 0,
    sleep: 7.5,
    meditation: 0,
  };
  
  const handleLogActivity = () => {
    const value = parseFloat(activityValue);
    
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid positive number.",
        variant: "destructive",
      });
      return;
    }
    
    const pointsEarned = value * selectedActivity.pointsPerUnit;
    
    toast({
      title: "Activity Logged!",
      description: `You earned ${pointsEarned} points for logging ${value} ${selectedActivity.unit}${value !== 1 ? 's' : ''}.`,
    });
    
    setOpenDialog(false);
    setActivityValue("");
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Activity Tracker</h2>
        <Button 
          className="bg-fitness-purple hover:bg-fitness-purple/90"
          onClick={() => setOpenDialog(true)}
        >
          Log Activity
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activityTypes.map((type) => (
          <ActivityCard
            key={type.id}
            activityType={type}
            todayValue={mockActivityValues[type.id as keyof typeof mockActivityValues] || 0}
          />
        ))}
      </div>
      
      {/* Log Activity Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log your activity</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Type</label>
              <div className="grid grid-cols-2 gap-2">
                {activityTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedActivity.id === type.id ? "default" : "outline"}
                    className={selectedActivity.id === type.id ? "bg-fitness-purple" : ""}
                    onClick={() => setSelectedActivity(type)}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                How many {selectedActivity.unit}s?
              </label>
              <Input
                type="number"
                min="0"
                step={selectedActivity.id === "sleep" ? "0.5" : "1"}
                value={activityValue}
                onChange={(e) => setActivityValue(e.target.value)}
                placeholder={`Enter ${selectedActivity.unit}s`}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              className="bg-fitness-purple hover:bg-fitness-purple/90"
              onClick={handleLogActivity}
            >
              Log Activity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityTracker;
