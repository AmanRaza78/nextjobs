"use server";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { type JobType, type JobCategory } from "@prisma/client";
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
  smalldescription: z
    .string()
    .min(10, { message: "Please give a small summary of your job post" }),
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

const applyJobSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "First name should be a min character of length 3" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "email is required" }),
  workexperience: z.number().min(1, { message: "work experience is required" }),
  linkedinurl: z
    .string()
    .min(5, { message: "Linkedin url should be a min character of length 5" }),
  resumeurl: z
    .string()
    .min(1, { message: "Resume is required to apply for the job" }),
  skills: z
    .array(
      z
        .string()
        .min(1, { message: "Each skill must be at least 1 character long" })
    )
    .min(1, { message: "At least one skill is required" }),
  jobid: z.string()
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
    smalldescription: formData.get("smalldescription"),
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
    data: {
      companyname: parsedFields.data.companyname,
      title: parsedFields.data.title,
      smalldescription: parsedFields.data.smalldescription,
      description: JSON.parse(parsedFields.data.description),
      Salary: parsedFields.data.salary,
      experience: parsedFields.data.experience,
      jobcategory: parsedFields.data.jobcategory as JobCategory,
      jobtype: parsedFields.data.jobtype as JobType,
      skills: parsedFields.data.skills,
      userId: user.id,
    },
  });

  return redirect(`/job/${data.id}`);
}

export async function CreateApplyJob(prevState: any, formData: FormData){
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user){
    return redirect("/api/auth/login")
  }

  const parsedFields = applyJobSchema.safeParse({
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
    email: formData.get("email"),
    workexperience: Number(formData.get("workexperience")),
    linkedinurl: formData.get("linkedinurl"),
    resumeurl: formData.get("resumeurl"),
    skills: JSON.parse(formData.get("skills") as string),
    jobid: formData.get("jobid")
  })

  if (!parsedFields.success) {
    const state: State = {
      status: "error",
      errors: parsedFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.candidate.create({
    data:{
      firstname: parsedFields.data.firstname,
      lastname: parsedFields.data.lastname,
      email: parsedFields.data.email,
      workexperience: parsedFields.data.workexperience,
      linkedinurl: parsedFields.data.linkedinurl,
      resumeurl: parsedFields.data.resumeurl,
      skills: parsedFields.data.skills,
      userId: user.id
    }
  })

  const applicationData = await prisma.application.create({
    data:{
      candidateId: data.id,
      jobid: parsedFields.data.jobid,
    }
  })

  return redirect("/success")

}
