
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockLeaderboard } from "@/utils/mockData";
import UserAvatar from "@/components/ui/UserAvatar";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "allTime">("weekly");
  
  // Top 5 users for preview
  const topUsers = mockLeaderboard.slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Leaderboard</CardTitle>
          <Link to="/leaderboard">
            <Button variant="ghost" className="text-sm flex items-center">
              Full Leaderboard <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Tabs
          defaultValue="weekly"
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as typeof timeframe)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topUsers.map((user) => (
            <div
              key={user.userId}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-medium text-sm">
                  {user.rank}
                </div>
                <UserAvatar user={{ avatarUrl: user.avatarUrl, name: user.name }} size="sm" />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.department}</p>
                </div>
              </div>
              <div className="font-semibold text-fitness-purple">
                {user.points} pts
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
