
// User type
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  points: number;
  level: number;
  joinedDate: string;
  department: string;
}

// Activity type
export interface Activity {
  id: string;
  userId: string;
  type: string;
  value: number;
  date: string;
  points: number;
}

// Reward type
export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  imageUrl: string;
  category: string;
  available: boolean;
}

// LeaderboardEntry type
export interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl: string;
  department: string;
  points: number;
  rank: number;
}

// ActivityType definition
export interface ActivityType {
  id: string;
  name: string;
  icon: string;
  pointsPerUnit: number;
  unit: string;
  goalPerDay: number;
}

// Goal type definition
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'failed';
  category: string;
  priority: 'low' | 'medium' | 'high';
  managerNotes?: string;
  healthBonusEligible: boolean;
  createdAt: string;
  updatedAt: string;
}
