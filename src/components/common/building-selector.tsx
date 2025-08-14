// src/components/common/building-selector.tsx
"use client";

import { Building } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BuildingSelector() {
  return (
    <div className="w-full">
      <Select defaultValue="building-1">
        <SelectTrigger className="w-full bg-background/50 hover:bg-background/80">
          <div className="flex items-center gap-2 truncate">
            <Building className="h-4 w-4 flex-shrink-0" />
            <SelectValue placeholder="Select a building" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="building-1">HQ Campus - Building A</SelectItem>
          <SelectItem value="building-2">Downtown Office - Tower 1</SelectItem>
          <SelectItem value="building-3">Research Lab - Unit 7</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
