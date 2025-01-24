"use server";

import { prisma } from "@/lib/prisma";
import { CreateContactInputs } from "./_components/CreateContact";
import { Contact } from "@prisma/client";

export const GetContactAction = async (): Promise<Contact[]> => {
  const contact = await prisma.contact.findMany();
  return contact;
};

export const CreateContactAction = async (
  data: CreateContactInputs
): Promise<Contact> => {
  const contact = await prisma.contact.create({
    data,
  });
  return contact;
};

export const DeleteContactAction = async (
  contact: Contact
): Promise<Contact> => {
  const deleted = await prisma.contact.delete({
    where: {
      id: contact.id,
    },
  });
  return deleted;
};
