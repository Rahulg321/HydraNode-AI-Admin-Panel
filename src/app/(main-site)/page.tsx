import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const HomePage = async () => {
    const session = await auth()

  return (
    <section className="relative overflow-hidden min-h-screen">
      {
        JSON.stringify(session)
      }
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 ">
            HydraNode Admin Panel
          </h1>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="px-8 py-6 rounded-full font-semibold transition-all duration-300  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              asChild
            >
              <Link href="/vendors">
                View Vendors
                <Search className="inline-block ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              className="px-8 py-6 rounded-full  font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              variant={"secondary"}
              asChild
            >
              <Link href={"/hydranode-admin"}>
                HydraNode Admin
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
