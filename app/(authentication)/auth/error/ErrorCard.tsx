"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const ErrorCard = () => {
  const searchParams = useSearchParams();
  let error = searchParams.get("error");

  if (error === "AccessDenied") {
    return (
      <div>
        <span className="error text-red-600 font-semibold">
          Your email account is not authorized to access this content
        </span>
      </div>
    );
  }

  return (
    <div>
      <span className="error text-red-600 font-semibold">
        {error ? error : null}
      </span>
    </div>
  );
};

export default ErrorCard;
