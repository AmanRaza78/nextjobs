"use client";

import { JobTypeValues } from "@/lib/job-type-values";
import { useState } from "react";
import { Card, CardHeader } from "./ui/card";

export default function SelectJobType() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input type="hidden" name="jobtype" value={selectedCategory || ""} />
      {JobTypeValues.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selectedCategory === item.name
                ? "border-primary border-2"
                : "border-2 border-primary/10"
            }
            onClick={()=>setSelectedCategory(item.name)}
          >
            <CardHeader>
                <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}