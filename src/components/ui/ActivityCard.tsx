
import { Activity, ActivityType } from "@/types";
import {
  Brain,
  Dumbbell,
  Droplet,
  Footprints,
  Moon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ActivityCardProps {
  activityType: ActivityType;
  todayValue?: number;
  className?: string;
}

const ActivityCard = ({ activityType, todayValue = 0, className }: ActivityCardProps) => {
  const iconMap: Record<string, LucideIcon> = {
    footprints: Footprints,
    droplet: Droplet,
    dumbbell: Dumbbell,
    moon: Moon,
    brain: Brain,
  };
  
  const IconComponent = iconMap[activityType.icon] || Footprints;
  const progressPercentage = Math.min(100, (todayValue / activityType.goalPerDay) * 100);
  
  return (
    <div className={cn("fitness-card group", className)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-fitness-purple/10 text-fitness-purple">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium">{activityType.name}</h3>
            <p className="text-sm text-gray-500">
              Target: {activityType.goalPerDay} {activityType.unit}s
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-semibold">{todayValue}</div>
          <p className="text-sm text-gray-500">{activityType.unit}s</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span className="text-fitness-purple font-medium">{progressPercentage.toFixed(0)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="mt-3 text-xs text-gray-500 flex justify-between">
        <span>
          {todayValue} / {activityType.goalPerDay} {activityType.unit}s
        </span>
        <span className="text-fitness-purple">
          +{todayValue * activityType.pointsPerUnit} pts
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;
