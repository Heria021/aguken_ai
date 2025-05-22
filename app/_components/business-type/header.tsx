"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { WelcomeFormValues } from "../welcome/welcomeform";

interface BusinessTypeHeaderProps {
  userData: WelcomeFormValues | null;
}

export default function BusinessTypeHeader({ userData }: BusinessTypeHeaderProps) {
  // Get the user's initials for the avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const userInitials = userData?.name ? getInitials(userData.name) : "?";
  const userName = userData?.name || "Guest";

  return (
    <Card className="p-0 shadow-none my-2">
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="h-12 w-12 bg-muted border border-border">
          <AvatarFallback className="text-base font-medium">{userInitials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-xs text-muted-foreground font-normal leading-none">Nice to meet you, I'm</p>
          <p className="text-sm font-semibold">{userName}</p>
        </div>
      </CardContent>
    </Card>
  );
}
