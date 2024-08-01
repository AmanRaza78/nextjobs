"use server"
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type JobType, type JobCategory} from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const jobPostSchema = z.object({
  companyname: z
    .string()
    .min(3, { message: "Company name should be a min character of length 3" }),
  title: z
    .string()
    .min(5, { message: "Job title should be a min character of length 5" }),
  description: z.string().min(10, { message: "Description is required" }),
  salary: z.number().min(1, { message: "Salary is required" }),
  experience: z.number().min(1, { message: "Experience is required" }),
  jobcategory: z.string().min(1, { message: "Job category is required" }),
  jobtype: z.string().min(1, { message: "Job type is required" }),
  skills: z
    .array(
      z
        .string()
        .min(1, { message: "Each skill must be at least 1 character long" })
    )
    .min(1, { message: "At least one skill is required" }),
});

export async function CreateJobPost(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const parsedFields = jobPostSchema.safeParse({
    companyname: formData.get("companyname"),
    title: formData.get("title"),
    description: formData.get("description"),
    salary: Number(formData.get("salary")),
    experience: Number(formData.get("experience")),
    jobcategory: formData.get("jobcategory"),
    jobtype: formData.get("jobtype"),
    skills: JSON.parse(formData.get("skills") as string),
  });

  if (!parsedFields.success) {
    const state: State = {
      status: "error",
      errors: parsedFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.job.create({
    data:{
        companyname: parsedFields.data.companyname,
        title: parsedFields.data.title,
        description: JSON.parse(parsedFields.data.description),
        Salary: parsedFields.data.salary,
        experience: parsedFields.data.experience,
        jobcategory: parsedFields.data.jobcategory as JobCategory,
        jobtype: parsedFields.data.jobtype as JobType,
        skills: parsedFields.data.skills,
        userId: user.id
    }
  })

  return redirect(`/job/${data.id}`);
}
