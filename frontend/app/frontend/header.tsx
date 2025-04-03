"use client";

import { ChevronDown, UserCircle } from "lucide-react";
// import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
// import { useAuth } from "../context/AuthChecker";
// import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/provider/themeProvider";
// import { destroyCookie } from "nookies";

export default function Header() {
  //   const auth = getAuth();
  const { theme, handleClick } = useTheme();
  //   const { user } = useAuth();

  const [dropDown, setDropDown] = useState(false);

  const router = useRouter();

  //   const handleSignOut = () => {
  //     auth.signOut();

  //     destroyCookie(null, "auth-token", {
  //       path: "/",
  //       maxAge: 60 * 60 * 24,
  //     });
  //     alert("Sign Out Successfully");
  //   };

  //   const handleSignIn = () => {
  //     router.push("/pages/au");
  //   };

  return (
    <header className="w-full   p-4 flex items-center justify-between ">
      {/* Sidebar Trigger */}

      {/* App Title */}
      <h1 className="text-xl font-semibold">AI Resume Screening</h1>

      {/* User Dropdown */}
      {/* <DropdownMenu onOpenChange={(open) => setDropDown(open)}>
        <DropdownMenuTrigger asChild>
          <div className="flex mr-10 items-center cursor-pointer">
            <UserCircle className="w-8 h-8 text-gray-600" />
            <ChevronDown
              className={`transition-transform ${
                dropDown ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </DropdownMenuTrigger> */}

      {/* </DropdownMenu> */}

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={handleClick}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          {theme === "dark" ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>

        {/* User Dropdown */}
        {/* <DropdownMenu onOpenChange={(open) => setDropDown(open)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <UserCircle className="w-8 h-8 text-gray-600" />
              <ChevronDown
                className={`transition-transform ${dropDown ? "rotate-180" : "rotate-0"}`}
              />
            </div>
          </DropdownMenuTrigger>
        </DropdownMenu> */}
      </div>
    </header>
  );
}
