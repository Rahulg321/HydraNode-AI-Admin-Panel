import React from "react";
import ErrorCard from "./ErrorCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthErrorPage = async () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section: Image */}
      <div className="relative hidden md:block">
        <Image
          src={"/question.avif"}
          alt="computer chip background for tech savy wallpaper"
          className="object-cover"
          fill
          priority
        />
      </div>

      {/* Right Section: Content */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full px-8 py-12 space-y-6">
          <h2 className="text-center">Welcome to HydraNode Admin Panel</h2>
          <p className="text-sm text-gray-600 text-center">
            An Error Occurred. Please try again.
          </p>

          <p className="text-xs text-gray-500 text-center">
            Only authorized members of the organization can access this
            platform.
          </p>

          <ErrorCard />
          <Button asChild className="block w-fit">
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthErrorPage;
