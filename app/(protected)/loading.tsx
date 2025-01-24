import { LoaderCircle } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="p-4 flex gap-2 items-center">
      <LoaderCircle className="animate-spin" /> Loading...
    </div>
  );
};

export default loading;
