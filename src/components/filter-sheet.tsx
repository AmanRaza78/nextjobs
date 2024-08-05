import { JobValidationSchema } from "@/lib/validation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { redirect } from "next/navigation";


async function FilterJobs(formData: FormData){
    "use server"
    const values = Object.fromEntries(formData.entries())
    const {jobtype, jobcategory, Salary, experience} = JobValidationSchema.parse(values)
    const searchParams = new URLSearchParams({
        ...(jobtype && {jobtype}),
        ...(jobcategory && {jobcategory}),
        ...(Salary &&{Salary: Salary.toString()}),
        ...(experience && {experience: experience.toString()})
    })

    redirect(`/jobs?${searchParams.toString()}`)
}

export default function FilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <form action="">
          <SheetHeader>
            <SheetTitle>Filter Results</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobtype">Job Type</Label>
              <Select name="jobtype">
                <SelectTrigger id="jobtype" className="col-span-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="REMOTE">Remote</SelectItem>
                  <SelectItem value="OFFSITE">Offsite</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobcategory">Job Category</Label>
              <Select name="jobcategory">
                <SelectTrigger id="jobcategory" className="col-span-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="NON_IT">Non-IT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Salary">Salary</Label>
              <Input type="number" id="Salary" name="Salary" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience">Experience</Label>
              <Input type="number" id="experience" name="experience" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Filter</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
