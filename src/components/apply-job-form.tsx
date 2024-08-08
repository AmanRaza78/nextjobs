"use client";
import { useEffect, useState } from "react";
import SkillsInput from "./skills-input";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import SubmitButton from "./submit-button";
import { CreateApplyJob, type State } from "@/app/action";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function ApplyJobForm({ jobid }: { jobid: string }) {
  const [skills, setSkills] = useState<string[]>([]);
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(CreateApplyJob, initalState);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input name="jobid" type="hidden" value={jobid} />
      <CardHeader>
        <CardDescription>Note: all fields are mandatory</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="firstname">Firstname</Label>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="John"
            required
            minLength={3}
          />
          {state?.errors?.["firstname"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["firstname"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Doe"
            required
            minLength={1}
          />
          {state?.errors?.["lastname"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["lastname"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            required
            minLength={1}
          />
          {state?.errors?.["email"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["email"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="workexperience">Work Experience</Label>
          <p className="text-muted-foreground">
            Note: If you have work experience less than 1 year put 0
          </p>
          <Input
            id="workexperience"
            name="workexperience"
            type="number"
            placeholder="Work experience in years (Eg: 0-2)"
            required
            minLength={1}
          />
          {state?.errors?.["workexperience"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["workexperience"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <SkillsInput skills={skills} setSkills={setSkills} />
          {state?.errors?.["skills"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["skills"]?.[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="linkedinurl">LinkedIn</Label>
          <Input
            id="linkedinurl"
            name="linkedinurl"
            type="text"
            placeholder="LindedIn Url"
            required
            minLength={5}
          />
          {state?.errors?.["linkedinurl"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["linkedinurl"]?.[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="resumeurl">Resume Url</Label>
          <Input
            id="resumeurl"
            name="resumeurl"
            type="text"
            placeholder="Resume Url"
            required
            minLength={1}
          />
          {state?.errors?.["linkedinurl"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["linkedinurl"]?.[0]}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Apply" />
      </CardFooter>
    </form>
  );
}
