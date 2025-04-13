
import { Goal } from "@/types";

// Mock data for goals
export const mockGoals: Goal[] = [
  // Subhransu's goals
  {
    id: "goal1",
    userId: "1",
    title: "Complete Fitness Challenge",
    description: "Complete the 30-day fitness challenge by reaching 10,000 steps daily",
    targetValue: 30,
    currentValue: 22,
    unit: "days",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "in-progress",
    category: "Physical Health",
    priority: "high",
    managerNotes: "This goal aligns with our company wellness initiative",
    healthBonusEligible: true,
    createdAt: "2024-12-15",
    updatedAt: "2025-01-15"
  },
  {
    id: "goal2",
    userId: "1",
    title: "Mental Wellness Program",
    description: "Complete all modules of the Mental Wellness Program",
    targetValue: 5,
    currentValue: 4,
    unit: "modules",
    startDate: "2025-02-01",
    endDate: "2025-02-28",
    status: "in-progress",
    category: "Mental Health",
    priority: "medium",
    managerNotes: "This program will help with stress management skills",
    healthBonusEligible: true,
    createdAt: "2025-01-20",
    updatedAt: "2025-02-10"
  },
  {
    id: "goal15",
    userId: "1",
    title: "Balanced Diet Plan",
    description: "Follow the company nutritionist's recommended meal plan",
    targetValue: 30,
    currentValue: 20,
    unit: "days",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Good progress on following the nutrition guidelines",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-02-05"
  },
  
  // Devendra's goals
  {
    id: "goal3",
    userId: "2",
    title: "Marathon Training",
    description: "Complete training for the company marathon event",
    targetValue: 12,
    currentValue: 10,
    unit: "weeks",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    status: "in-progress",
    category: "Physical Health",
    priority: "high",
    managerNotes: "Great progress on the training schedule",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-02-20"
  },
  {
    id: "goal4",
    userId: "2",
    title: "Reduce Screen Time",
    description: "Decrease daily screen time to improve eye health",
    targetValue: 30,
    currentValue: 25,
    unit: "days",
    startDate: "2025-02-01",
    endDate: "2025-03-02",
    status: "in-progress",
    category: "Mental Health",
    priority: "medium",
    managerNotes: "This will help reduce eye strain and improve productivity",
    healthBonusEligible: true,
    createdAt: "2025-01-25",
    updatedAt: "2025-02-15"
  },
  {
    id: "goal16",
    userId: "2",
    title: "Protein Intake Goal",
    description: "Meet daily protein requirements through balanced nutrition",
    targetValue: 30,
    currentValue: 22,
    unit: "days",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    status: "in-progress",
    category: "Nutrition",
    priority: "high",
    managerNotes: "Good progress with protein intake goals",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-02-05"
  },
  
  // Nagarjun's goals
  {
    id: "goal5",
    userId: "3",
    title: "Hydration Goal",
    description: "Drink at least 8 glasses of water daily",
    targetValue: 30,
    currentValue: 25,
    unit: "days",
    startDate: "2025-01-10",
    endDate: "2025-02-10",
    status: "in-progress",
    category: "Nutrition",
    priority: "low",
    managerNotes: "Staying hydrated will improve overall health",
    healthBonusEligible: true,
    createdAt: "2025-01-05",
    updatedAt: "2025-01-22"
  },
  {
    id: "goal6",
    userId: "3",
    title: "Sleep Improvement",
    description: "Maintain 7+ hours of quality sleep each night",
    targetValue: 60,
    currentValue: 50,
    unit: "nights",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    status: "in-progress",
    category: "Physical Health",
    priority: "high",
    managerNotes: "Good progress on sleep routine",
    healthBonusEligible: true,
    createdAt: "2024-12-20",
    updatedAt: "2025-02-10"
  },
  {
    id: "goal17",
    userId: "3",
    title: "Stress Management",
    description: "Practice daily mindfulness and stress reduction techniques",
    targetValue: 30,
    currentValue: 20,
    unit: "days",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    status: "in-progress",
    category: "Mental Health",
    priority: "medium",
    managerNotes: "Making good progress with consistent practice",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-02-05"
  },
  
  // Santosh's goals
  {
    id: "goal7",
    userId: "4",
    title: "Yoga Challenge",
    description: "Complete 20 yoga sessions in one month",
    targetValue: 20,
    currentValue: 20,
    unit: "sessions",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "completed",
    category: "Physical Health",
    priority: "medium",
    managerNotes: "Excellent work completing this ahead of schedule!",
    healthBonusEligible: true,
    createdAt: "2024-12-15",
    updatedAt: "2025-01-25"
  },
  {
    id: "goal8",
    userId: "4",
    title: "Stress Management",
    description: "Practice daily mindfulness meditation",
    targetValue: 60,
    currentValue: 52,
    unit: "days",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    status: "in-progress",
    category: "Mental Health",
    priority: "medium",
    managerNotes: "Good consistency in practice",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-02-15"
  },
  {
    id: "goal18",
    userId: "4",
    title: "Balanced Meal Planning",
    description: "Prepare and follow weekly meal plans focusing on balanced nutrition",
    targetValue: 8,
    currentValue: 6,
    unit: "weeks",
    startDate: "2025-01-01",
    endDate: "2025-02-28",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Excellent progress with meal planning and preparation",
    healthBonusEligible: true,
    createdAt: "2024-12-28",
    updatedAt: "2025-02-10"
  },
  
  // Surath's goals
  {
    id: "goal9",
    userId: "5",
    title: "Nutrition Plan",
    description: "Follow the company nutrition plan for 30 days",
    targetValue: 30,
    currentValue: 18,
    unit: "days",
    startDate: "2025-02-01",
    endDate: "2025-03-02",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Keep up with the plan to see full benefits",
    healthBonusEligible: true,
    createdAt: "2025-01-25",
    updatedAt: "2025-02-10"
  },
  {
    id: "goal10",
    userId: "5",
    title: "Gym Attendance",
    description: "Visit company gym at least 3 times per week",
    targetValue: 48,
    currentValue: 42,
    unit: "visits",
    startDate: "2025-01-01",
    endDate: "2025-04-30",
    status: "in-progress",
    category: "Physical Health",
    priority: "high",
    managerNotes: "Great consistency in attendance",
    healthBonusEligible: true,
    createdAt: "2024-12-20",
    updatedAt: "2025-02-15"
  },
  {
    id: "goal19",
    userId: "5",
    title: "Work-Life Balance",
    description: "Practice techniques to improve work-life balance and mental wellbeing",
    targetValue: 30,
    currentValue: 22,
    unit: "days",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    status: "in-progress",
    category: "Mental Health",
    priority: "high",
    managerNotes: "Good progress implementing daily balance practices",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-02-05"
  },
  
  // Virat's goals
  {
    id: "goal11",
    userId: "6",
    title: "Daily Meditation",
    description: "Practice meditation for 15 minutes daily",
    targetValue: 30,
    currentValue: 28,
    unit: "days",
    startDate: "2025-01-01",
    endDate: "2025-01-30",
    status: "completed",
    category: "Mental Health",
    priority: "high",
    managerNotes: "Excellent adherence to the meditation schedule",
    healthBonusEligible: true,
    createdAt: "2024-12-28",
    updatedAt: "2025-01-29"
  },
  {
    id: "goal12",
    userId: "6",
    title: "Healthy Meal Prep",
    description: "Prepare healthy lunches for the work week",
    targetValue: 8,
    currentValue: 7,
    unit: "weeks",
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Great commitment to nutrition goals",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-03-05"
  },
  {
    id: "goal20",
    userId: "6",
    title: "Strength Training",
    description: "Complete strength training program 3 times per week",
    targetValue: 36,
    currentValue: 30,
    unit: "sessions",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "in-progress",
    category: "Physical Health",
    priority: "high",
    managerNotes: "Excellent progress with strength training regimen",
    healthBonusEligible: true,
    createdAt: "2024-12-28",
    updatedAt: "2025-02-15"
  }
];

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
