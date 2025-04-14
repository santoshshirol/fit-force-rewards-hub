
import { Goal } from "@/types";

// Helper function to generate random goal data
const generateRandomGoalData = (userId: string, category: string, startingId: string) => {
  const titles: Record<string, string[]> = {
    "Physical Health": [
      "Complete Fitness Challenge",
      "Marathon Training",
      "Weekly Gym Sessions",
      "Strength Training Program",
      "Yoga Challenge",
      "Walking Steps Goal",
      "Swimming Sessions"
    ],
    "Mental Health": [
      "Mental Wellness Program",
      "Daily Meditation",
      "Stress Management",
      "Work-Life Balance",
      "Mindfulness Practice",
      "Digital Detox",
      "Journal Writing"
    ],
    "Nutrition": [
      "Balanced Diet Plan",
      "Hydration Goal",
      "Protein Intake Goal",
      "Meal Prepping",
      "Healthy Meal Prep",
      "Reduced Sugar Intake",
      "Vegetable Intake Goal"
    ]
  };
  
  const descriptions: Record<string, string[]> = {
    "Physical Health": [
      "Complete the 30-day fitness challenge by reaching 10,000 steps daily",
      "Train for the upcoming company marathon event",
      "Attend the gym at least 3 times per week",
      "Complete strength training program with increasing weights",
      "Complete 20 yoga sessions in one month",
      "Reach daily step count target consistently",
      "Complete weekly swimming sessions for cardiovascular health"
    ],
    "Mental Health": [
      "Complete all modules of the Mental Wellness Program",
      "Practice daily mindfulness meditation",
      "Learn and apply stress reduction techniques",
      "Practice techniques to improve work-life balance",
      "Complete daily mindfulness exercises",
      "Reduce screen time and social media usage",
      "Maintain a daily gratitude journal"
    ],
    "Nutrition": [
      "Follow the company nutritionist's balanced meal plan",
      "Drink at least 8 glasses of water daily",
      "Meet daily protein requirements through balanced nutrition",
      "Prepare weekly meal plans in advance",
      "Prepare healthy lunches for the work week",
      "Reduce daily sugar intake to recommended levels",
      "Consume 5+ servings of vegetables daily"
    ]
  };
  
  const units: Record<string, string[]> = {
    "Physical Health": ["days", "weeks", "sessions", "workouts", "minutes"],
    "Mental Health": ["days", "sessions", "minutes", "exercises", "weeks"],
    "Nutrition": ["days", "meals", "glasses", "weeks", "servings"]
  };
  
  // Generate random values
  const randomTitleIndex = Math.floor(Math.random() * titles[category].length);
  const randomTarget = Math.floor(Math.random() * 40) + 10; // Between 10-50
  const randomCurrent = Math.floor(Math.random() * randomTarget);
  const randomUnitIndex = Math.floor(Math.random() * units[category].length);
  const randomPriority = ["low", "medium", "high"][Math.floor(Math.random() * 3)];
  
  // Random dates
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30)); // Random start date within last 30 days
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 60) + 30); // End date between 30-90 days after start
  
  const createdDate = new Date(startDate);
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 15)); // Created a bit before start
  
  const updatedDate = new Date(today);
  updatedDate.setDate(updatedDate.getDate() - Math.floor(Math.random() * 10)); // Updated recently
  
  // Generate goal status
  const progressPercent = (randomCurrent / randomTarget) * 100;
  let status: "not-started" | "in-progress" | "completed";
  
  if (randomCurrent === 0) {
    status = "not-started";
  } else if (randomCurrent >= randomTarget) {
    status = "completed";
  } else {
    status = "in-progress";
  }
  
  return {
    id: `${startingId}-${userId}-${category.toLowerCase().replace(' ', '-')}`,
    userId,
    title: titles[category][randomTitleIndex],
    description: descriptions[category][randomTitleIndex],
    targetValue: randomTarget,
    currentValue: randomCurrent,
    unit: units[category][randomUnitIndex],
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    status,
    category,
    priority: randomPriority as "low" | "medium" | "high",
    managerNotes: `${status === "completed" ? "Great job completing this goal!" : status === "in-progress" ? "Good progress so far" : "Please start working on this goal"}`,
    healthBonusEligible: Math.random() > 0.3, // 70% chance to be eligible
    createdAt: createdDate.toISOString().split('T')[0],
    updatedAt: updatedDate.toISOString().split('T')[0]
  };
};

// Generate a complete set of goals for each user including all categories
const generateUserGoals = () => {
  const userIds = ["1", "2", "3", "4", "5", "6"];
  const categories = ["Physical Health", "Mental Health", "Nutrition"];
  const goals: Goal[] = [];
  let goalId = 100; // Starting goal ID
  
  userIds.forEach(userId => {
    categories.forEach(category => {
      // Generate 2-3 goals per category per user
      const numGoals = Math.floor(Math.random() * 2) + 2; // 2-3 goals
      
      for (let i = 0; i < numGoals; i++) {
        goals.push(generateRandomGoalData(userId, category, `goal${goalId++}`));
      }
    });
  });
  
  return goals;
};

// Mock data for goals
export const mockGoals: Goal[] = generateUserGoals();

// Get goals for a specific user
export const getUserGoals = (userId: string): Goal[] => {
  return mockGoals.filter(goal => goal.userId === userId);
};

// Calculate total health bonus eligibility
export const calculateHealthBonusEligibility = (userId: string): number => {
  const userGoals = getUserGoals(userId);
  const eligibleGoals = userGoals.filter(goal => goal.healthBonusEligible);
  
  if (eligibleGoals.length === 0) return 0;
  
  // Calculate progress for each goal
  const totalProgress = eligibleGoals.reduce((sum, goal) => {
    const goalProgress = (goal.currentValue / goal.targetValue) * 100;
    return sum + goalProgress;
  }, 0);
  
  // Average progress across all eligible goals
  return totalProgress / eligibleGoals.length;
};

// Get direct reports for a manager (everyone is a manager in this case)
export const getDirectReports = (managerId: string): string[] => {
  // For demo purposes, everyone is a manager and can see all other users
  return ["1", "2", "3", "4", "5", "6"].filter(id => id !== managerId);
};

// Get team health status for manager view
export const getTeamHealthStatus = (managerId: string) => {
  const directReports = getDirectReports(managerId);
  
  return directReports.map(userId => {
    const userGoals = getUserGoals(userId);
    const completedGoals = userGoals.filter(goal => goal.status === "completed").length;
    const inProgressGoals = userGoals.filter(goal => goal.status === "in-progress").length;
    const totalGoals = userGoals.length;
    
    const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
    const healthBonusEligibility = calculateHealthBonusEligibility(userId);
    
    return {
      userId,
      completedGoals,
      inProgressGoals,
      totalGoals,
      completionRate,
      healthBonusEligibility
    };
  });
};

// Get goal statistics by category
export const getGoalStatsByCategory = (userId: string) => {
  const userGoals = getUserGoals(userId);
  const categories = ["Physical Health", "Mental Health", "Nutrition"];
  
  return categories.map(category => {
    const categoryGoals = userGoals.filter(goal => goal.category === category);
    const completed = categoryGoals.filter(goal => goal.status === "completed").length;
    const inProgress = categoryGoals.filter(goal => goal.status === "in-progress").length;
    const total = categoryGoals.length;
    
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    return {
      category,
      completed,
      inProgress,
      total,
      completionRate
    };
  });
};
