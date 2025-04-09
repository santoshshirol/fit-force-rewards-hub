
import { Goal } from "@/types";

// Mock data for goals
export const mockGoals: Goal[] = [
  {
    id: "goal1",
    userId: "user1",
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
    userId: "user1",
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
    id: "goal3",
    userId: "user1",
    title: "Reduce Sedentary Time",
    description: "Take active breaks every hour during work days",
    targetValue: 20,
    currentValue: 20,
    unit: "days",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    status: "completed",
    category: "Physical Health",
    priority: "medium",
    managerNotes: "Great job completing this goal ahead of schedule!",
    healthBonusEligible: true,
    createdAt: "2024-12-20",
    updatedAt: "2025-01-25"
  },
  {
    id: "goal4",
    userId: "user1",
    title: "Healthy Eating Challenge",
    description: "Log nutritious meals for 14 consecutive days",
    targetValue: 14,
    currentValue: 5,
    unit: "days",
    startDate: "2025-03-01",
    endDate: "2025-03-14",
    status: "not-started",
    category: "Nutrition",
    priority: "low",
    managerNotes: "This will help establish better eating habits",
    healthBonusEligible: true,
    createdAt: "2025-02-15",
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
  const completedEligibleGoals = userGoals.filter(
    goal => goal.status === 'completed' && goal.healthBonusEligible
  );
  
  return (completedEligibleGoals.length / userGoals.length) * 100;
};
