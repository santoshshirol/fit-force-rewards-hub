import { Activity, User, Reward, LeaderboardEntry } from '../types';

// User mock data
export const currentUser: User = {
  id: '1',
  name: 'Subhransu Panda',
  email: 'subhransu.panda@company.com',
  avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Subhransu',
  points: 1250,
  level: 3,
  joinedDate: new Date('2023-10-15').toISOString(),
  department: 'IT',
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Devendra Kumar',
    email: 'devendra.kumar@company.com',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Devendra',
    points: 1680,
    level: 4,
    joinedDate: new Date('2023-09-10').toISOString(),
    department: 'Engineering',
  },
  {
    id: '3',
    name: 'Nagarjun Reddy',
    email: 'nagarjun.reddy@company.com',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nagarjun',
    points: 950,
    level: 2,
    joinedDate: new Date('2023-11-05').toISOString(),
    department: 'HR',
  },
  {
    id: '4',
    name: 'Santosh Singh',
    email: 'santosh.singh@company.com',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Santosh',
    points: 2200,
    level: 5,
    joinedDate: new Date('2023-08-20').toISOString(),
    department: 'Finance',
  },
  {
    id: '5',
    name: 'Anil Sharma',
    email: 'anil.sharma@company.com',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Anil',
    points: 1100,
    level: 3,
    joinedDate: new Date('2023-10-01').toISOString(),
    department: 'Sales',
  },
  {
    id: '6',
    name: 'Priya Patel',
    email: 'priya.patel@company.com',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Priya',
    points: 1850,
    level: 4,
    joinedDate: new Date('2023-09-15').toISOString(),
    department: 'Marketing',
  },
  {
    id: '7',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rajesh',
    points: 2050,
    level: 5,
    joinedDate: new Date('2023-08-05').toISOString(),
    department: 'Engineering',
  }
];

// Activity types
export const activityTypes = [
  { id: 'steps', name: 'Steps', icon: 'footprints', pointsPerUnit: 1, unit: 'step', goalPerDay: 10000 },
  { id: 'water', name: 'Water', icon: 'droplet', pointsPerUnit: 10, unit: 'glass', goalPerDay: 8 },
  { id: 'workout', name: 'Workout', icon: 'dumbbell', pointsPerUnit: 100, unit: 'session', goalPerDay: 1 },
  { id: 'sleep', name: 'Sleep', icon: 'moon', pointsPerUnit: 50, unit: 'hour', goalPerDay: 8 },
  { id: 'meditation', name: 'Meditation', icon: 'brain', pointsPerUnit: 20, unit: 'minute', goalPerDay: 15 },
];

// Activity mock data (last 7 days)
export const mockActivities: Activity[] = [
  {
    id: '1',
    userId: '1',
    type: 'steps',
    value: 9256,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    points: 92,
  },
  {
    id: '2',
    userId: '1',
    type: 'water',
    value: 6,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    points: 60,
  },
  {
    id: '3',
    userId: '1',
    type: 'workout',
    value: 1,
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    points: 100,
  },
  {
    id: '4',
    userId: '1',
    type: 'sleep',
    value: 7.5,
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    points: 375,
  },
  {
    id: '5',
    userId: '1',
    type: 'meditation',
    value: 10,
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    points: 200,
  },
  {
    id: '6',
    userId: '1',
    type: 'steps',
    value: 11245,
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    points: 112,
  },
  {
    id: '7',
    userId: '1',
    type: 'water',
    value: 8,
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    points: 80,
  },
];

// Rewards mock data
export const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Coffee Gift Card',
    description: 'Enjoy a free coffee from the company café',
    pointsCost: 500,
    imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=coffee',
    category: 'Food & Drink',
    available: true,
  },
  {
    id: '2',
    name: 'Extra PTO Day',
    description: 'Get an additional paid time off day to use this year',
    pointsCost: 5000,
    imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=beach',
    category: 'Time Off',
    available: true,
  },
  {
    id: '3',
    name: 'Fitness Tracker',
    description: 'A brand new fitness tracker to help you stay active',
    pointsCost: 8000,
    imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=watch',
    category: 'Gadgets',
    available: true,
  },
  {
    id: '4',
    name: 'Lunch Voucher',
    description: 'Free lunch at any partner restaurant',
    pointsCost: 800,
    imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=food',
    category: 'Food & Drink',
    available: true,
  },
  {
    id: '5',
    name: 'Wellness Session',
    description: 'A session with a professional wellness coach',
    pointsCost: 1200,
    imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=heart',
    category: 'Wellness',
    available: true,
  },
  {
    id: '6',
    name: 'Standing Desk',
    description: 'Upgrade your workspace with a standing desk',
    pointsCost: 7500,
    imageUrl: 'https://api.dicebear.com/7.x/icons/svg?seed=desk',
    category: 'Office',
    available: true,
  },
];

// Leaderboard mock data
export const mockLeaderboard: LeaderboardEntry[] = mockUsers
  .map(user => ({
    userId: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
    department: user.department,
    points: user.points,
    rank: 0, // Will be calculated below
  }))
  .sort((a, b) => b.points - a.points)
  .map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

// Function to fetch activities for a user
export const getUserActivities = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};

// Function to calculate user's progress
export const calculateProgress = (userId: string): { 
  totalPoints: number;
  streak: number;
  completedToday: number;
  totalActivities: number;
} => {
  const activities = getUserActivities(userId);
  const today = new Date().toISOString().split('T')[0];
  
  return {
    totalPoints: activities.reduce((sum, activity) => sum + activity.points, 0),
    streak: 7, // Mock streak value
    completedToday: activities.filter(a => a.date.split('T')[0] === today).length,
    totalActivities: activities.length,
  };
};
