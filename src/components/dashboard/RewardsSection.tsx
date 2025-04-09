
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RewardCard from "@/components/ui/RewardCard";
import { mockRewards } from "@/utils/mockData";
import { Link } from "react-router-dom";

const RewardsSection = () => {
  // Get first 3 rewards for preview
  const previewRewards = mockRewards.slice(0, 3);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Available Rewards</h2>
        <Link to="/rewards">
          <Button variant="ghost" className="flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {previewRewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
};

export default RewardsSection;
