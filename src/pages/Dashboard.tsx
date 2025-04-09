
import Layout from "@/components/Layout";
import PointsSummary from "@/components/dashboard/PointsSummary";
import ActivityTracker from "@/components/dashboard/ActivityTracker";
import RewardsSection from "@/components/dashboard/RewardsSection";
import Leaderboard from "@/components/dashboard/Leaderboard";
import { currentUser } from "@/utils/mockData";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Get the user's first name for display
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {firstName}</h1>
            <p className="text-muted-foreground">
              Here's an overview of your fitness journey
            </p>
          </div>
        </div>
        
        {/* Points summary */}
        <PointsSummary />
        
        {/* Activity tracker */}
        <ActivityTracker />
        
        {/* Rewards and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Leaderboard />
          <RewardsSection />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
