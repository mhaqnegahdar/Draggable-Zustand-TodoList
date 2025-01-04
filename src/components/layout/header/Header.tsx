"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";

const links: {
  title: string;
  href: string;
  target?: HTMLAnchorElement["target"];
}[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Follow Me",
    href: "https://www.linkedin.com/in/mhaqnegahdar/",
    target: "_blank",
  },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border border-b">
      <Image src={"/Logo.png"} width={50} height={50} alt="Logo" />
      <NavigationMenu>
        <NavigationMenuList>
          <ThemeToggle />
          {links.map((link) => (
            <NavigationMenuItem id={link.title} key={link.title}>
              <Link
                href={`${link.href}`}
                legacyBehavior
                passHref
                target={link.target}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
