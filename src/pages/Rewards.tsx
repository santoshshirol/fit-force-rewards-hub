
import { useState } from "react";
import Layout from "@/components/Layout";
import { mockRewards } from "@/utils/mockData";
import RewardCard from "@/components/ui/RewardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Rewards = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(
    new Set(mockRewards.map((reward) => reward.category))
  );
  
  // Filter rewards by search and category
  const filteredRewards = mockRewards.filter((reward) => {
    const matchesSearch = reward.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === null || reward.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rewards Catalog</h1>
            <p className="text-muted-foreground">
              Redeem your points for exciting rewards
            </p>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search rewards..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-fitness-purple" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-fitness-purple" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Results count */}
        <div>
          <Badge variant="outline" className="text-sm">
            {filteredRewards.length} rewards available
          </Badge>
        </div>
        
        {/* Rewards grid */}
        {filteredRewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No rewards found for your search.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Rewards;
