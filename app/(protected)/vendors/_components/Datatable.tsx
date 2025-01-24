import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Datatable = () => {
  return (
    <Button asChild>
      <Link href="/vendors/create">Create New Vendor</Link>
    </Button>
  );
};

export default Datatable;
