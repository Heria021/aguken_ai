"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FileUploadGroup } from "./FileUploadSection";

interface FileGroupListProps {
  fileUploadGroups: FileUploadGroup[];
  removeFileUploadGroup: (id: string) => void;
}

export default function FileGroupList({
  fileUploadGroups,
  removeFileUploadGroup,
}: FileGroupListProps) {
  if (fileUploadGroups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Added SOPs: </h3>
      <div className="space-y-4">
        {fileUploadGroups.map((group, index) => (
          <div
            key={group.id}
            className="border border-border rounded-lg p-4 bg-muted relative"
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0 bg-transparent border-border rounded-full"
              onClick={() => removeFileUploadGroup(group.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-foreground">
                  {group.groupName} <span className="pl-1">#{index + 1}</span>
                </h4>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 text-xs">
                <div className="text-muted-foreground">Files:</div>
                <div className="font-medium text-foreground">files ({group.files.length})</div>

                <div className="text-muted-foreground">Description:</div>
                <div className="text-foreground whitespace-pre-wrap break-words">
                  {group.description || "—"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
