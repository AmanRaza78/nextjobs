import ProductDescription from "@/components/production-description";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { JSONContent } from "@tiptap/react";
import { Calendar, HandCoins } from "lucide-react";
import { Building2 } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";

async function getData(id: string) {
  const data = await prisma.job.findUnique({
    where: {
      id: id,
    },
    select: {
      companyname: true,
      title: true,
      description: true,
      Salary: true,
      skills: true,
      experience: true,
      userId: true,
      createdAt: true,
    },
  });

  return data;
}

export default async function Job({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(params.id);
  return (
    <div className="w-full">
      <section className="bg-muted py-12 md:py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10 lg:gap-12">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {data?.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5" />
                <p>{data?.companyname}.</p>
                <HandCoins className="h-5 w-5" />
                <p>Salary - {data?.Salary}</p>
                <BriefcaseBusiness className="h-5 w-5" />
                <p>Experience - {data?.experience}</p>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <p>Posted on - </p>
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "long",
                }).format(data?.createdAt)}
              </div>
            </div>
            <div className="flex justify-end">
              {user?.id !== data?.userId && <Button>Apply Now</Button>}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-12">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Job Description</h2>
              <ProductDescription content={data?.description as JSONContent} />
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">Required Skills</h2>
              <div className="flex space-x-2 m-2">
                {data?.skills.map((skill, index) => (
                  <Badge variant="secondary" key={index}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
