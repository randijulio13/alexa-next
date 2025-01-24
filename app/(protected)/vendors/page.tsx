import React from "react";
import Datatable from "./_components/Datatable";
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
    },
  ];
  return (
    <div className="p-4">
      <div className="mb-4">
        <AppBreadcrumb items={items} />
      </div>
      <Datatable />
    </div>
  );
};

export default page;
