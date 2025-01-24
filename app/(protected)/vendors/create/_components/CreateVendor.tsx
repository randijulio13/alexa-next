"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateVendor = () => {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>Create New Vendor</CardTitle>
        <CardDescription>
          Fill out the form below to create a new vendor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default CreateVendor;
