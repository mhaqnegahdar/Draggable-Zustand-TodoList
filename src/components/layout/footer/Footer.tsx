// Hooks / Packages
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

// Utils
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer id="footer" className="w-full flex items-center justify-center divide-x p-4 ">
      <small className="px-4 text-nowrap">
        © {new Date().getFullYear()} Mohamad Haqnegahdar
      </small>
      <Link
        href={`https://github.com/mhaqnegahdar`}
        className={cn(buttonVariants({ variant: "link" }), "rounded-none h-4")}
        target={"_blank"}
      >
        <Github />
      </Link>
      <Link
        href={`https://www.linkedin.com/in/mhaqnegahdar/`}
        className={cn(buttonVariants({ variant: "link" }), "rounded-none h-4")}
        target={"_blank"}

      >
        <Linkedin />
      </Link>
    </footer>
  );
}
