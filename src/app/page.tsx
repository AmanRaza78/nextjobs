import JobCard from "@/components/job-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { ArrowRightIcon, SearchIcon, UsersIcon, Briefcase } from "lucide-react";
import Link from "next/link";

async function getData(){
  const data = await prisma.job.findMany({
      select:{
          id: true,
          title: true,
          companyname: true,
          jobcategory: true,
          jobtype: true,
          smalldescription:true
      }
  })
  return data
}

export default async function Home() {
  const data = await getData()
  return (
    <main className="flex-1">
      <section className="bg-primary py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-primary-foreground mb-8">
            Search through thousands of job listings and find the perfect
            opportunity for you.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Featured Jobs</h2>
            <p className="text-muted-foreground">
              Check out some of the top job listings on our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              data.map((job)=>(
                <JobCard
                key={job.id}
                title={job.title}
                jobcategory={job.jobcategory}
                jobtype={job.jobtype}
                companyname={job.companyname}
                smalldescription={job.smalldescription}
                id = {job.id}
                />
              ))
            }
            
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">About JobPortal</h2>
              <p className="text-muted-foreground mb-4">
                JobPortal is a leading job search platform that connects
                talented individuals with exciting career opportunities. Our
                mission is to help people find their dream jobs and empower
                employers to build amazing teams.
              </p>
              <p className="text-muted-foreground mb-4">
                With a vast database of job listings, powerful search tools, and
                a user-friendly interface, JobPortal makes it easy for job
                seekers to find the perfect fit. We also provide employers with
                the tools they need to attract and hire top talent.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Job Posting</h3>
                    <p className="text-muted-foreground">
                      Post your job listings on our platform and reach thousands
                      of qualified candidates.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <SearchIcon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Job Search</h3>
                    <p className="text-muted-foreground">
                      Use our powerful search tools to find the perfect job for
                      your skills and experience.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <UsersIcon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Candidate Matching
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI-powered matching system helps you find the best
                      candidates for your open positions.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
