
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import GoalList from "@/components/goals/GoalList";
import GoalSummary from "@/components/goals/GoalSummary";
import { getUserGoals } from "@/utils/goalsData";
import { mockUsers } from "@/utils/mockData";

const Goals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Check if a userId is specified in the URL (for manager view)
  const urlUserId = searchParams.get("userId");
  
  // Determine which user's goals to display
  const viewUserId = urlUserId || (user?.id || "");
  const viewingOtherUser = urlUserId && urlUserId !== user?.id;
  
  // Get user information for display
  const viewedUser = viewingOtherUser 
    ? mockUsers.find(u => u.id === urlUserId)
    : user;
  
  // Get goals for the current user or specified user
  const userGoals = getUserGoals(viewUserId);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Show notification when viewing another user's goals
  useEffect(() => {
    if (viewingOtherUser && viewedUser) {
      toast({
        title: `Viewing ${viewedUser.name}'s Goals`,
        description: "You are viewing goals as a manager",
      });
    }
  }, [urlUserId, viewingOtherUser, viewedUser, toast]);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold">
              {viewingOtherUser && viewedUser 
                ? `${viewedUser.name}'s Goals` 
                : "Health & Performance Goals"
              }
            </h1>
            {viewingOtherUser && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                Manager View
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            {viewingOtherUser 
              ? "Review team member's progress and health bonus eligibility"
              : "Track your organizational goals and health bonus eligibility"
            }
          </p>
        </div>
        
        {/* Goal Summary */}
        <GoalSummary userId={viewUserId} />
        
        {/* Goals Listing */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger 
                value="all" 
                onClick={() => handleCategoryChange("all")}
              >
                All Goals
              </TabsTrigger>
              <TabsTrigger 
                value="physical" 
                onClick={() => handleCategoryChange("Physical Health")}
              >
                Physical Health
              </TabsTrigger>
              <TabsTrigger 
                value="mental" 
                onClick={() => handleCategoryChange("Mental Health")}
              >
                Mental Health
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition" 
                onClick={() => handleCategoryChange("Nutrition")}
              >
                Nutrition
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <GoalList 
              goals={userGoals}
              category={selectedCategory === "all" ? undefined : selectedCategory}
            />
          </TabsContent>
          
          <TabsContent value="physical">
            <GoalList 
              goals={userGoals}
              category="Physical Health"
            />
          </TabsContent>
          
          <TabsContent value="mental">
            <GoalList 
              goals={userGoals}
              category="Mental Health"
            />
          </TabsContent>
          
          <TabsContent value="nutrition">
            <GoalList 
              goals={userGoals}
              category="Nutrition"
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Goals;
