import React from "react";
import Dashboard from "./_components/Dashboard";
import { GetTotalContactAction } from "./actions";
import AppBreadcrumb, {
  BreadcrumbItemProps,
} from "@/components/app/breadcrumb";

const page = async () => {
  const totalContact = await GetTotalContactAction();

  const items: BreadcrumbItemProps[] = [
    {
      label: "Home",
    },
  ];
  return (
    <div className="p-4">
      <div className="mb-4">
        <AppBreadcrumb items={items} />
      </div>
      <Dashboard totalContact={totalContact} />
    </div>
  );
};

export default page;
