import FilterSheet from "@/components/filter-sheet";
import JobCard from "@/components/job-card";
import SearchBar from "@/components/search-bar";
import prisma from "@/lib/db";

async function getData(searchParams: Record<string, string>) {
  const { jobtype, jobcategory, Salary, experience, query } = searchParams;
  const filters: any = {};
  if (jobtype) filters.jobtype = jobtype;
  if (jobcategory) filters.jobcategory = jobcategory;
  if (Salary) filters.Salary = Number(Salary);
  if (experience) filters.experience = Number(experience);

  if (query) {
    filters.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { companyname: { contains: query, mode: "insensitive" } },
    ];
  }

  const data = await prisma.job.findMany({
    where: filters,
    select: {
      id: true,
      title: true,
      companyname: true,
      jobcategory: true,
      jobtype: true,
      smalldescription: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Jobs({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const data = await getData(searchParams);
  return (
    <section className="max-w-7xl mt-4 px-4 md:px-8 mb-14">
      <div className="my-4">
        <FilterSheet />
      </div>

      <div className="mb-4">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            jobcategory={job.jobcategory}
            jobtype={job.jobtype}
            companyname={job.companyname}
            smalldescription={job.smalldescription}
            id={job.id}
          />
        ))}
      </div>
    </section>
  );
}
