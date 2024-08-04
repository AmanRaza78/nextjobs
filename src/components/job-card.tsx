import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ArrowRightIcon } from "lucide-react";

interface JobCardProps {
  title: string;
  companyname: string;
  jobcategory: string;
  jobtype: string;
  smalldescription: string;
  id: string;
}

export default function JobCard({
  title,
  companyname,
  jobcategory,
  jobtype,
  smalldescription,
  id,
}: JobCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{companyname}</p>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{jobcategory}</Badge>
          <Badge variant="secondary">{jobtype}</Badge>
        </div>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {smalldescription}
        </p>
        <Link
          href={`/job/${id}`}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <span>Apply Now</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
