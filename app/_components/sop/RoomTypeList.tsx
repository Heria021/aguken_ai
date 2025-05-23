"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { RoomTypeEntry } from "./types";

interface RoomTypeListProps {
  roomTypes: RoomTypeEntry[];
  removeRoomType: (index: number) => void;
}

export default function RoomTypeList({
  roomTypes,
  removeRoomType,
}: RoomTypeListProps) {
  if (roomTypes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Added Room Types: </h3>
      <div className="space-y-4">
        {roomTypes.map((room, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 bg-muted relative"
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0 bg-transparent border-border rounded-full"
              onClick={() => removeRoomType(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="space-y-4">
              <div className="grid grid-cols-[auto_1fr] gap-2 text-xs">
                <div className="text-muted-foreground">Room Type:</div>
                <div className="font-medium text-foreground">{room.roomType}</div>

                <div className="text-muted-foreground">Price:</div>
                <div className="font-medium text-foreground">{room.currency}{room.roomPrice}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
