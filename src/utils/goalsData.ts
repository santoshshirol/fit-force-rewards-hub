
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
    currentValue: 15,
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
    currentValue: 3,
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
    title: "Healthy Meal Planning",
    description: "Plan and prepare healthy meals 5 days a week",
    targetValue: 20,
    currentValue: 12,
    unit: "days",
    startDate: "2025-02-15",
    endDate: "2025-03-15",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Great progress on establishing healthy eating habits",
    healthBonusEligible: true,
    createdAt: "2025-02-10",
    updatedAt: "2025-02-25"
  },
  {
    id: "goal16",
    userId: "1",
    title: "Yoga Classes",
    description: "Attend yoga sessions twice a week for stress management",
    targetValue: 16,
    currentValue: 16,
    unit: "sessions",
    startDate: "2025-01-05",
    endDate: "2025-03-01",
    status: "completed",
    category: "Mental Health",
    priority: "low",
    managerNotes: "Excellent commitment to regular yoga practice",
    healthBonusEligible: true,
    createdAt: "2024-12-20",
    updatedAt: "2025-02-28"
  },
  
  // Devendra's goals
  {
    id: "goal3",
    userId: "2",
    title: "Marathon Training",
    description: "Complete training for the company marathon event",
    targetValue: 12,
    currentValue: 8,
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
    currentValue: 18,
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
    id: "goal17",
    userId: "2",
    title: "Plant-Based Diet Challenge",
    description: "Follow a plant-based diet for at least 3 days per week",
    targetValue: 12,
    currentValue: 10,
    unit: "weeks",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Excellent adaptation to new dietary habits",
    healthBonusEligible: true,
    createdAt: "2025-01-05",
    updatedAt: "2025-03-25"
  },
  {
    id: "goal18",
    userId: "2",
    title: "Morning Meditation",
    description: "Practice morning meditation for 15 minutes daily",
    targetValue: 60,
    currentValue: 60,
    unit: "days",
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    status: "completed",
    category: "Mental Health",
    priority: "high",
    managerNotes: "Excellent consistency and discipline!",
    healthBonusEligible: true,
    createdAt: "2024-12-28",
    updatedAt: "2025-03-01"
  },
  
  // Nagarjun's goals
  {
    id: "goal5",
    userId: "3",
    title: "Hydration Goal",
    description: "Drink at least 8 glasses of water daily",
    targetValue: 30,
    currentValue: 12,
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
    currentValue: 45,
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
    id: "goal19",
    userId: "3",
    title: "Mindfulness Practice",
    description: "Practice mindfulness techniques daily",
    targetValue: 45,
    currentValue: 45,
    unit: "days",
    startDate: "2025-01-15",
    endDate: "2025-03-01",
    status: "completed",
    category: "Mental Health", 
    priority: "medium",
    managerNotes: "Successfully integrated mindfulness into daily routine",
    healthBonusEligible: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-03-01"
  },
  {
    id: "goal20",
    userId: "3",
    title: "Sugar Reduction Challenge",
    description: "Reduce daily sugar intake to less than 25g",
    targetValue: 30,
    currentValue: 15,
    unit: "days",
    startDate: "2025-02-01",
    endDate: "2025-03-02",
    status: "in-progress",
    category: "Nutrition",
    priority: "high",
    managerNotes: "Making good progress in reducing sugar consumption",
    healthBonusEligible: true,
    createdAt: "2025-01-25",
    updatedAt: "2025-02-15"
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
    currentValue: 40,
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
    id: "goal21",
    userId: "4",
    title: "Strength Training",
    description: "Complete three strength training sessions per week",
    targetValue: 12,
    currentValue: 12,
    unit: "weeks",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "completed",
    category: "Physical Health",
    priority: "high",
    managerNotes: "Excellent consistency and strength improvements!",
    healthBonusEligible: true,
    createdAt: "2024-12-28",
    updatedAt: "2025-03-31"
  },
  {
    id: "goal22",
    userId: "4",
    title: "Balanced Diet Plan",
    description: "Follow company nutritionist's balanced diet plan",
    targetValue: 45,
    currentValue: 30,
    unit: "days",
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    status: "in-progress",
    category: "Nutrition",
    priority: "medium",
    managerNotes: "Consistent progress with nutritional goals",
    healthBonusEligible: true,
    createdAt: "2025-01-25",
    updatedAt: "2025-03-05"
  },
  
  // Anil's goals
  {
    id: "goal9",
    userId: "5",
    title: "Nutrition Plan",
    description: "Follow the company nutrition plan for 30 days",
    targetValue: 30,
    currentValue: 10,
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
    currentValue: 36,
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
  
  // Priya's goals
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
  
  // Rajesh's goals
  {
    id: "goal13",
    userId: "7",
    title: "Cycling Challenge",
    description: "Cycle to work at least 3 times a week",
    targetValue: 12,
    currentValue: 12,
    unit: "weeks",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "completed",
    category: "Physical Health",
    priority: "high",
    managerNotes: "Successfully completed the full cycling challenge!",
    healthBonusEligible: true,
    createdAt: "2024-12-20",
    updatedAt: "2025-03-31"
  },
  {
    id: "goal14",
    userId: "7",
    title: "Reduce Caffeine Intake",
    description: "Limit coffee consumption to 1 cup per day",
    targetValue: 30,
    currentValue: 25,
    unit: "days",
    startDate: "2025-02-01",
    endDate: "2025-03-02",
    status: "completed",
    category: "Nutrition",
    priority: "low",
    managerNotes: "Great progress in building healthier habits",
    healthBonusEligible: true,
    createdAt: "2025-01-25",
    updatedAt: "2025-03-01"
  }
];

// Get goals for a specific user
export const getUserGoals = (userId: string): Goal[] => {
  return mockGoals.filter(goal => goal.userId === userId);
};

// Calculate total health bonus eligibility
export const calculateHealthBonusEligibility = (userId: string): number => {
  const userGoals = getUserGoals(userId);
  const completedEligibleGoals = userGoals.filter(
    goal => goal.status === 'completed' && goal.healthBonusEligible
  );
  
  return userGoals.length > 0 ? (completedEligibleGoals.length / userGoals.length) * 100 : 0;
};

// Get direct reports for a manager (for demo purposes, let's say Subhransu is the manager)
export const getDirectReports = (managerId: string): string[] => {
  // For demo purposes, if managerId is "1" (Subhransu), return IDs of direct reports
  if (managerId === "1") {
    return ["2", "3", "4", "5", "6", "7"]; // Added Priya and Rajesh
  }
  return [];
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
