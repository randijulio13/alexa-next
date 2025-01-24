import React from "react";
import CreateVendor from "./_components/CreateVendor";
import AppBreadcrumb, {
  BreadcrumbItemProps,
} from "@/components/app/breadcrumb";

const page = () => {
  const items: BreadcrumbItemProps[] = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Vendors",
      link: "/vendors",
    },
    {
      label: "Create",
    },
  ];
  return (
    <div className="p-4">
      <div className="mb-4">
        <AppBreadcrumb items={items} />
      </div>
      <CreateVendor />
    </div>
  );
};

export default page;
