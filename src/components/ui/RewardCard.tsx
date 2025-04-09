
import { Reward } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { currentUser } from "@/utils/mockData";

interface RewardCardProps {
  reward: Reward;
  className?: string;
}

const RewardCard = ({ reward, className }: RewardCardProps) => {
  const { toast } = useToast();
  
  const handleRedemption = () => {
    if (currentUser.points >= reward.pointsCost) {
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.name}.`,
      });
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${reward.pointsCost - currentUser.points} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };
  
  const canAfford = currentUser.points >= reward.pointsCost;
  
  return (
    <div className={cn("fitness-card flex flex-col h-full", className)}>
      <div className="relative mb-3">
        <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center overflow-hidden">
          <img
            src={reward.imageUrl}
            alt={reward.name}
            className="w-16 h-16 object-contain"
          />
        </div>
        <Badge className="absolute top-2 right-2 bg-fitness-orange border-none">
          {reward.category}
        </Badge>
      </div>
      
      <h3 className="font-semibold text-lg">{reward.name}</h3>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{reward.description}</p>
      
      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Cost:</span>
          <span className="font-semibold">{reward.pointsCost} points</span>
        </div>
        
        <Button
          className={cn(
            "w-full", 
            canAfford ? "bg-fitness-purple hover:bg-fitness-purple/90" : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
          )}
          onClick={handleRedemption}
          disabled={!canAfford}
        >
          {canAfford ? "Redeem Reward" : "Not Enough Points"}
        </Button>
      </div>
    </div>
  );
};

export default RewardCard;
