import prisma from "@/lib/db";

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
      jobcategory: true,
      jobtype: true,
      experience: true,
      userId: true,
      createdAt: true,
    },
  });

  return data;
}

export default async function Job({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return(
    <>
    <p>{data?.title}</p>
    <p>{data?.companyname}</p>
    <p>{data?.Salary}</p>
    </>
  );
}
