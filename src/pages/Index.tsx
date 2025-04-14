
import { Button } from "@/components/ui/button";
import { Activity, Award, Heart, Smartphone, Users } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleLearnMore = () => {
    setLearnMoreOpen(true);
  };

  const features = [
    {
      title: "Activity Tracking",
      description: "Log all your daily fitness activities like steps, workouts, hydration and more.",
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: "Point Rewards System",
      description: "Earn points for every healthy activity and redeem them for exciting rewards.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Friendly Competition",
      description: "Compete with colleagues on the leaderboard to stay motivated and engaged.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Wellness Focus",
      description: "Improve your overall well-being with a balanced approach to physical and mental health.",
      icon: <Heart className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-fitness-blue/20 py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Boost your health, <span className="text-fitness-purple">earn rewards</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-lg">
                Track your fitness activities, earn points, and redeem them for exciting rewards. Stay healthy while having fun!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-fitness-purple hover:bg-fitness-purple/90 text-white font-medium"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={handleLearnMore}>
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${i}`}
                      alt="User avatar"
                      className="w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Joined by <span className="font-medium">1,000+</span> employees
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Everything You Need to Stay Fit</h2>
            <p className="mt-4 text-xl text-gray-600">
              Our comprehensive platform helps you maintain a healthy lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="fitness-card hover:translate-y-[-4px] transition-all">
                <div className="bg-fitness-purple/10 p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-fitness-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your workplace wellness?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of companies using FitForce to create healthier, happier, and more productive teams.
          </p>
          <Button
            size="lg"
            className="bg-white text-fitness-purple hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full fitness-gradient flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">FitForce</span>
            </div>
            <p className="text-sm text-gray-600 mt-4 md:mt-0">
              © {new Date().getFullYear()} FitForce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Learn More Dialog */}
      <Dialog open={learnMoreOpen} onOpenChange={setLearnMoreOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">FitForce: Employee Health & Wellness Platform</DialogTitle>
            <DialogDescription>
              Discover how our platform can transform your company's wellness program.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold">How FitForce Works</h3>
              <p className="mt-2 text-muted-foreground">
                FitForce connects your employees through a gamified health platform that tracks fitness activities,
                rewards healthy behaviors, and creates friendly competition to boost engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-fitness-purple" />
                  Track Daily Activities
                </h4>
                <p className="text-sm text-muted-foreground">
                  Log steps, workouts, water intake, and more to earn points and track progress toward health goals.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-fitness-purple" />
                  Earn Rewards
                </h4>
                <p className="text-sm text-muted-foreground">
                  Convert activity points into real rewards like gift cards, extra PTO, or company perks.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-fitness-purple" />
                  Team Competition
                </h4>
                <p className="text-sm text-muted-foreground">
                  Compete on leaderboards with colleagues to stay motivated and build team camaraderie.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-fitness-purple" />
                  Manager Insights
                </h4>
                <p className="text-sm text-muted-foreground">
                  Team leaders get valuable insights into their team's wellness journey without compromising privacy.
                </p>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">Ready to get started?</h3>
              <p className="text-sm mb-4">
                Join the thousands of companies that have improved employee wellness, reduced healthcare costs, 
                and boosted productivity with FitForce.
              </p>
              <Button onClick={() => { setLearnMoreOpen(false); navigate('/dashboard'); }}>
                Get Started Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
