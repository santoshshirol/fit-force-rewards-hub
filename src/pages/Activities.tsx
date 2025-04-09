
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Droplets, FootprintsIcon, Moon } from "lucide-react";
import { useState } from "react";
import { mockActivities } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Activities = () => {
  const [activeTab, setActiveTab] = useState("steps");
  const { toast } = useToast();

  const handleLogActivity = (type: string) => {
    // In a real app, this would save to the database
    toast({
      title: "Activity Logged",
      description: `Your ${type} activity has been recorded successfully.`,
    });
  };

  const activities = mockActivities.slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Activity Tracking</h1>
          <p className="text-muted-foreground">
            Log and track your daily activities to earn points
          </p>
        </div>

        <Tabs defaultValue="steps" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="steps">
              <FootprintsIcon className="w-4 h-4 mr-2" />
              Steps
            </TabsTrigger>
            <TabsTrigger value="workout">
              <Activity className="w-4 h-4 mr-2" />
              Workout
            </TabsTrigger>
            <TabsTrigger value="water">
              <Droplets className="w-4 h-4 mr-2" />
              Water
            </TabsTrigger>
            <TabsTrigger value="sleep">
              <Moon className="w-4 h-4 mr-2" />
              Sleep
            </TabsTrigger>
          </TabsList>

          <TabsContent value="steps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Steps Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Steps Count
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        className="flex-1 rounded-md border border-input p-2"
                        placeholder="0"
                        min="0"
                      />
                      <Button 
                        className="bg-fitness-purple hover:bg-fitness-purple/90"
                        onClick={() => handleLogActivity("steps")}
                      >
                        Log Steps
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workout" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Workout Type
                    </label>
                    <select className="w-full rounded-md border border-input p-2 mb-2">
                      <option>Running</option>
                      <option>Cycling</option>
                      <option>Swimming</option>
                      <option>Weightlifting</option>
                      <option>Yoga</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-input p-2"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <Button 
                  className="bg-fitness-purple hover:bg-fitness-purple/90"
                  onClick={() => handleLogActivity("workout")}
                >
                  Log Workout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Water Intake Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Glasses of Water
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      className="flex-1 rounded-md border border-input p-2"
                      placeholder="0"
                      min="0"
                    />
                    <Button 
                      className="bg-fitness-purple hover:bg-fitness-purple/90"
                      onClick={() => handleLogActivity("water")}
                    >
                      Log Water
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sleep Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Hours Slept
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-input p-2"
                      placeholder="0"
                      min="0"
                      max="24"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sleep Quality
                    </label>
                    <select className="w-full rounded-md border border-input p-2">
                      <option>Poor</option>
                      <option>Fair</option>
                      <option>Good</option>
                      <option>Excellent</option>
                    </select>
                  </div>
                </div>
                <Button 
                  className="bg-fitness-purple hover:bg-fitness-purple/90"
                  onClick={() => handleLogActivity("sleep")}
                >
                  Log Sleep
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Activities</h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-fitness-purple/10 p-2 rounded-full">
                        {activity.type === 'steps' && <FootprintsIcon className="w-5 h-5 text-fitness-purple" />}
                        {activity.type === 'workout' && <Activity className="w-5 h-5 text-fitness-purple" />}
                        {activity.type === 'water' && <Droplets className="w-5 h-5 text-fitness-purple" />}
                        {activity.type === 'sleep' && <Moon className="w-5 h-5 text-fitness-purple" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{activity.value} {activity.type === 'steps' ? 'steps' : 
                                                           activity.type === 'workout' ? 'min' : 
                                                           activity.type === 'water' ? 'glasses' : 'hours'}</p>
                      <p className="text-sm font-medium text-fitness-purple">+{activity.points} pts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
