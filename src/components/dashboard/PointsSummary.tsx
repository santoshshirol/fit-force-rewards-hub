
import { Award, Calendar, Flame, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { currentUser } from "@/utils/mockData";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const PointsSummary = () => {
  // Calculate points needed for next level (mock data)
  const pointsForNextLevel = 2000;
  const progressToNextLevel = Math.min(100, (currentUser.points / pointsForNextLevel) * 100);
  
  // Stats cards data
  const statsCards = [
    {
      title: "Weekly Streak",
      value: "7 Days",
      icon: <Flame className="h-4 w-4" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Activities Today",
      value: "3 / 5",
      icon: <Calendar className="h-4 w-4" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Rank",
      value: "#3",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Rewards Claimed",
      value: "2",
      icon: <Award className="h-4 w-4" />,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Points progress card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Your Points</h3>
              <p className="text-sm text-muted-foreground">Keep going to reach the next level!</p>
            </div>
            <div className="mt-2 sm:mt-0 text-right">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold text-fitness-purple">
                  {currentUser.points}
                </span>
                <span className="text-sm text-muted-foreground">pts</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Level {currentUser.level}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress to Level {currentUser.level + 1}</span>
              <span>{progressToNextLevel.toFixed(0)}%</span>
            </div>
            <Progress 
              value={progressToNextLevel} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Level {currentUser.level}</span>
              <span>{currentUser.points} / {pointsForNextLevel} pts</span>
              <span>Level {currentUser.level + 1}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className={cn("p-2 rounded-full mb-3", stat.bgColor)}>
                <div className={cn("rounded-full p-1", stat.color)}>
                  {stat.icon}
                </div>
              </div>
              <div className="font-medium text-lg">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PointsSummary;
