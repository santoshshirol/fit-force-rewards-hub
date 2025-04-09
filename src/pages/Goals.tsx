
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import GoalList from "@/components/goals/GoalList";
import GoalSummary from "@/components/goals/GoalSummary";
import { getUserGoals } from "@/utils/goalsData";

const Goals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Get goals for the current user
  const userGoals = user?.id ? getUserGoals(user.id) : [];
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Health & Performance Goals</h1>
          <p className="text-muted-foreground">
            Track your organizational goals and health bonus eligibility
          </p>
        </div>
        
        {/* Goal Summary */}
        <GoalSummary userId={user?.id || ""} />
        
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
