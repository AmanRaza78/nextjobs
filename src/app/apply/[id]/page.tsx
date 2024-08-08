import ApplyJobForm from "@/components/apply-job-form";
import { Card } from "@/components/ui/card";

export default function Apply({ params }: { params: { id: string } }) {
  return (
    <section className="max-w-7xl mt-4 px-4 md:px-8 mb-14">
      <Card>
        <ApplyJobForm jobid={params.id}/>
      </Card>
    </section>
  );
}
