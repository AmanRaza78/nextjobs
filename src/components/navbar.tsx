import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Navbar(){
    return(
        <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          <span className="text-xl font-bold">JobPortal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="#" className="hover:underline">
            Find Jobs
          </Link>
          <Link href="#" className="hover:underline">
            Employers
          </Link>
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button>Sign In</Button>
          <Button variant="secondary">Register</Button>
        </div>
      </header>
    )
}