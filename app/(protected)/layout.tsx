import AppSidebar from "@/components/app/sidebar";
import AppTopbar from "@/components/app/topbar";
import { decodeToken } from "@/lib/utils";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import Loading from "./loading";
import AppBreadcrumb from "@/components/app/breadcrumb";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const userData = decodeToken(String(token));

  return (
    <>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <AppTopbar userData={userData} />
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
        </Suspense>
      </div>
    </>
  );
};

export default layout;
