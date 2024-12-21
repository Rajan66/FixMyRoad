"use client"

import Image from "next/image";
import logo from "@/public/assets/logo.png";
import Link from "next/link";
import { navItems } from "./list/navItems";
import NavItem from "./NavItem";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { CircleUser, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
// import LogoutBtnNav from "./LogoutBtnNav";

const Nav = () => {
//   const { data: session } = useSession();
//   const userRole = session?.user?.role;
  return (
    <header className="flex gap-5 justify-between bg-white mx-[20px] md:mx-[40px] 2xl:mx-[80px] my-2 max-md:flex-wrap">
      <Link href={"/"} className="flex flex-col justify-center items-center ">
        <Image
          src={logo}
          width={200}
          height={200}
          alt="BiteBuddy Logo"
          className="my-auto max-w-full w-[60px]"
        />
        <h1 className="text-lg font-bold">FixMyRoad</h1>
      </Link>
      <div className="flex gap-10">
        <nav className="hidden gap-[10px] mmd:flex items-center max-md:flex-wrap">
          {navItems.map((link, index) => (
            <NavItem key={index} href={link.href} name={link.name} />
          ))}
        </nav>

          <>
            <Link
              href="/login"
              className="hidden mmd:flex justify-center items-center"
            >
              <Button className="px-5 py-2.5 my-auto text-base h-[45px] font-medium text-white uppercase bg-primary border-r-0 rounded-sm hover:bg-primary/80">
                Login
              </Button>
            </Link>
            <Link
              href="/signup"
              className="hidden mmd:flex justify-center items-center"
            >
              <Button className="px-5 py-2.5 my-auto text-base h-[45px] font-medium text-white uppercase border-r-0 rounded-sm">
                Signup
              </Button>
            </Link>
          </>
    
        {/* <div className="flex mmd:hidden justify-center items-center">
          <MblNavbar />
        </div> */}
      </div>
    </header >
  );
};


export default Nav;