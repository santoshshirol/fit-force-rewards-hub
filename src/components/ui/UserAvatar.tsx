
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: Partial<User>;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  className?: string;
}

const UserAvatar = ({ 
  user, 
  size = "md", 
  showBadge = false,
  className 
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };
  
  const badgeSizeClasses = {
    sm: "w-3 h-3 right-0 bottom-0",
    md: "w-4 h-4 right-0 bottom-0",
    lg: "w-6 h-6 right-1 bottom-1",
  };
  
  return (
    <div className={cn("relative inline-block", className)}>
      <img
        src={user.avatarUrl || "https://api.dicebear.com/7.x/adventurer/svg?seed=fallback"}
        alt={user.name || "User avatar"}
        className={cn("rounded-full object-cover", sizeClasses[size])}
      />
      {showBadge && user.level && (
        <div className={cn(
          "absolute flex items-center justify-center rounded-full bg-fitness-purple text-white text-xs font-bold border-2 border-white", 
          badgeSizeClasses[size]
        )}>
          {user.level}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
