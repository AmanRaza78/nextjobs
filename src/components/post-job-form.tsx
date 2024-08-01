"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { type JSONContent } from "@tiptap/react";
import SelectJobCategory from "./select-job-category";
import SelectJobType from "./select-job-type";
import SkillsInput from "./skills-input";
import { CreateJobPost, type State } from "@/app/action";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import SubmitButton from "./submit-button";

const TipTapEditor = dynamic(() => import("./Editor"), { ssr: false });

export default function PostJobForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(CreateJobPost, initalState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
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
          {state?.errors?.["companyname"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["companyname"]?.[0]}
            </p>
          )}
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
          {state?.errors?.["title"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["title"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          />
          <Label>Description</Label>
          <TipTapEditor json={json} setJson={setJson} />
          {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["description"]?.[0]}
            </p>
          )}
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
          {state?.errors?.["salary"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["salary"]?.[0]}</p>
          )}
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
          {state?.errors?.["experience"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["experience"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Job Category</Label>
          <SelectJobCategory />
          {state?.errors?.["jobcategory"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["jobcategory"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Job Type</Label>
          <SelectJobType />
          {state?.errors?.["jobtype"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["jobtype"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <SkillsInput skills={skills} setSkills={setSkills} />
          {state?.errors?.["skills"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["skills"]?.[0]}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Create Job"/>
      </CardFooter>
    </form>
  );
}
