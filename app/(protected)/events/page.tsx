import AppBreadcrumb, {
  BreadcrumbItemProps,
} from "@/components/app/breadcrumb";
import React from "react";

const page = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const items: BreadcrumbItemProps[] = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Events",
    },
  ];
  return (
    <div className="p-4">
      <div className="mb-4">
        <AppBreadcrumb items={items} />
      </div>
      <span>Events</span>
    </div>
  );
};

export default page;
