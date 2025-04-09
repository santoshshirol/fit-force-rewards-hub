
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeaderboard } from "@/utils/mockData";
import { Medal } from "lucide-react";

const Leaderboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against your colleagues
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Departments</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockLeaderboard.map((entry) => (
                    <div
                      key={entry.userId}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.rank <= 3
                          ? "bg-fitness-purple/10"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                          {entry.rank <= 3 ? (
                            <Medal className={`w-5 h-5 ${
                              entry.rank === 1 
                                ? "text-yellow-500" 
                                : entry.rank === 2 
                                ? "text-gray-400" 
                                : "text-amber-700"
                            }`} />
                          ) : (
                            <span className="text-sm font-semibold text-gray-700">
                              {entry.rank}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <img
                            src={entry.avatarUrl}
                            alt={entry.name}
                            className="w-9 h-9 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{entry.name}</p>
                            <p className="text-xs text-gray-500">
                              {entry.department}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-fitness-purple">
                          {entry.points.toLocaleString()} pts
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>This Week's Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Weekly leaderboard will reset every Monday.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>This Month's Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Monthly leaderboard will reset at the beginning of each month.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>How Points Are Calculated</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside">
              <li>10 points for every 1,000 steps</li>
              <li>5 points for every workout minute</li>
              <li>20 points for logging 8 glasses of water</li>
              <li>25 points for logging 7+ hours of sleep</li>
              <li>Bonus points for consistent activity streaks</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;
