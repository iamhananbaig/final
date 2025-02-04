"use client";
import { AirVent, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import NavLinks from "./navlinks";
import AuthButtons from "./authButtons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b px-4 w-full">
      <div className="flex items-center justify-between mx-auto h-16 max-w-6xl">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <AirVent className="h-6 w-6" />
          <span className="font-bold">Next Secure.</span>
        </Link>

        {/* Center: Navigation Buttons (Visible on larger screens) */}
        <div className="hidden md:flex justify-center gap-4 flex-grow">
          {/* Centered Navigation Links */}
          <NavLinks /> {/* Use the shared NavLinks component */}
        </div>

        {/* Right Side: Auth Buttons (Visible on larger screens) */}
        <div className="hidden md:flex">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu (Visible on small screens) */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center gap-4 py-4 border-t">
          <NavLinks /> {/* Use the shared NavLinks component */}
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
