import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  return (
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
          Post a Job
        </Link>
        <Link href="/postjob" className="hover:underline">
          About
        </Link>
        <Link href="#" className="hover:underline">
          Contact
        </Link>
      </nav>
      {(await isAuthenticated()) ? (
        <div className="flex items-center gap-2">
          <LogoutLink>
            <Button>Logout</Button>
          </LogoutLink>
          <Link href="#">
            <Button>Profile</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <LoginLink>
            <Button>Sign In</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="secondary">Sign Up</Button>
          </RegisterLink>
        </div>
      )}
    </header>
  );
}
