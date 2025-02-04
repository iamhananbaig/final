import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function NavLinks() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className="relative">
        {/* Main Button */}
        <Button
          variant="ghost"
          onMouseEnter={() => setIsDropdownOpen(true)} // Show dropdown on hover
          onFocus={() => setIsDropdownOpen(true)} // Ensure dropdown shows when focused
          onMouseLeave={() => setIsDropdownOpen(false)} // Hide dropdown on mouse leave
        >
          Dashboard
        </Button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className="absolute left-0 w-48 mt-2 bg-white shadow-lg rounded-md z-10"
            onMouseEnter={() => setIsDropdownOpen(true)} // Keep dropdown open when hovering over it
            onMouseLeave={() => setIsDropdownOpen(false)} // Hide dropdown when leaving
          >
            <Link
              href="/dashboard/overview"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/reports"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Reports
            </Link>
            <Link
              href="/dashboard/settings"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Dashboard Settings
            </Link>
          </div>
        )}
      </div>

      {/* Other Links */}
      <Link href="/dashboard2">
        <Button variant="ghost">Client Dashboard</Button>
      </Link>
      <Link href="/settings">
        <Button variant="ghost">Settings</Button>
      </Link>
    </>
  );
}
