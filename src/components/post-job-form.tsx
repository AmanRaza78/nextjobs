"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { type JSONContent } from "@tiptap/react";
import SelectJobCategory from "./select-job-category";
import SelectJobType from "./select-job-type";
import SkillsInput from "./skills-input";

const TipTapEditor = dynamic(() => import("./Editor"), { ssr: false });

export default function PostJobForm() {
  const [json, setJson] = useState<null | JSONContent>(null);
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <form action="">
      <CardHeader>
        <CardTitle>Describe Your Job. Note: All Fields are mendatory</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="companyname">Company Name</Label>
          <Input
            id="companyname"
            name="companyname"
            type="text"
            placeholder="Name of your company"
            required
            minLength={3}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Job Title"
            required
            minLength={5}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          />
          <Label>Description</Label>
          <TipTapEditor json={json} setJson={setJson} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input
            id="salary"
            type="number"
            placeholder="Salary in INR"
            name="salary"
            required
            min={1}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="experience">Experience Required</Label>
          <Input
            id="experience"
            type="number"
            placeholder="Exprience Required in Years (Eg: 0-2)"
            name="experience"
            required
            min={1}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Job Category</Label>
          <SelectJobCategory />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Job Type</Label>
          <SelectJobType />
        </div>

        <div className="flex flex-col gap-y-2">
          <SkillsInput skills={skills} setSkills={setSkills} />
        </div>
      </CardContent>
    </form>
  );
}
