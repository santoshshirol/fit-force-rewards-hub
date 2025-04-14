
import { Button } from "@/components/ui/button";
import { Activity, Award, Heart, Smartphone, Users } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
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
              <Button size="lg" variant="outline">
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
    </div>
  );
};

export default Index;
