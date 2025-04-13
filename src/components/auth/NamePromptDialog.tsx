
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const NamePromptDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { user, updateUserInfo } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in but doesn't have a name
    if (user && (!user.name || user.name.trim() === "")) {
      setOpen(true);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue",
        variant: "destructive"
      });
      return;
    }

    try {
      await updateUserInfo({ name: name.trim() });
      setOpen(false);
      toast({
        title: "Name updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your name",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to FitForce</DialogTitle>
          <DialogDescription>
            Please provide your name to personalize your experience
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full">
              Save and Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NamePromptDialog;
