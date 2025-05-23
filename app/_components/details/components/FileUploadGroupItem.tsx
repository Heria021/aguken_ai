"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FileUploadGroup {
  id: string;
  groupName: string;
  description: string;
  files: File[];
}

interface FileUploadGroupItemProps {
  group: FileUploadGroup;
  onRemove: (id: string) => void;
  index?: number; // Optional index parameter to show sequential numbers
}

export function FileUploadGroupItem({ group, onRemove, index = 0 }: FileUploadGroupItemProps) {
  return (
    <div
      key={group.id}
      className="border border-border rounded-lg p-4 bg-muted relative"
    >
      <Button
        type="button"
        variant={'outline'}
        size="sm"
        className="absolute top-2 right-2 h-6 w-6 p-0 bg-transparent border-border rounded-full"
        onClick={() => onRemove(group.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-foreground">
            Upload Menus(for food ordering or inquiries)
            <span className="pl-1">#{index + 1}</span>
          </h4>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-2 text-xs">
          <div className="text-muted-foreground">Group Name:</div>
          <div className="font-medium text-foreground break-words">{group.groupName}</div>

          <div className="text-muted-foreground">Files:</div>
          <div className="font-medium text-foreground">files ({group.files.length})</div>

          <div className="text-muted-foreground">Description:</div>
          <div className="text-foreground whitespace-pre-wrap break-words">
            {group.description || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
