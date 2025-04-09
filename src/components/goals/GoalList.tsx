
import { useState } from "react";
import { Goal } from "@/types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GoalCard from "./GoalCard";
import GoalDetailDialog from "./GoalDetailDialog";

interface GoalListProps {
  goals: Goal[];
  category?: string;
}

const GoalList = ({ goals, category }: GoalListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("endDate");
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Filter goals by category and search term
  const filteredGoals = goals
    .filter(goal => !category || goal.category === category)
    .filter(goal => 
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sort goals
  const sortedGoals = [...filteredGoals].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case "status":
        const statusOrder = { 
          "not-started": 0, 
          "in-progress": 1, 
          "completed": 2, 
          "failed": 3 
        };
        return statusOrder[a.status] - statusOrder[b.status];
      case "endDate":
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      default:
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
  });

  const handleViewGoalDetails = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleCloseDialog = () => {
    setSelectedGoal(null);
  };

  return (
    <div className="space-y-4">
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search goals..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="endDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Goal cards */}
      {filteredGoals.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedGoals.map((goal) => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onViewDetails={() => handleViewGoalDetails(goal)} 
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No goals found matching your criteria.</p>
        </div>
      )}
      
      {/* Goal details dialog */}
      {selectedGoal && (
        <GoalDetailDialog 
          goal={selectedGoal} 
          open={!!selectedGoal} 
          onClose={handleCloseDialog} 
        />
      )}
    </div>
  );
};

export default GoalList;
