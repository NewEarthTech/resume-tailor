"use server";

import { redirect } from "next/navigation";
import {
  insertUserEmailSchema,
  insertUserNameSchema,
  insertUserSchema,
  UserNameTable,
} from "@/db/schema";
// import { db } from "@/db";
// import { insertUserSchema, ResumeTable, UsersTable } from "@/db/schema/";
import { auth, currentUser } from "@clerk/nextjs";

const clerkUser = {
  id: "user_2XPEtZkx3Usnmk8zWhj79UE26PJ",
  primaryEmailAddressId: "idn_2XPEtbV4iOCzgL5B3DXR7rsavTR",
  primaryPhoneNumberId: "idn_2XPEtYyD8Df5AkfPhxJm4XkocEN",
  username: "john-carmack",
  firstName: "John",
  lastName: "Carmack",
  emailAddresses: [
    // _EmailAddress
    {
      id: "idn_2XPEtbV4iOCzgL5B3DXR7rsavTR",
      emailAddress: "johncarmack@me.com",
      verification: [
        // _Verification
      ],
      linkedTo: [Array],
    },
  ],
  phoneNumbers: [
    // _PhoneNumber
    {
      id: "idn_2XPEtYyD8Df5AkfPhxJm4XkocEN",
      phoneNumber: "+5127445833",
      reservedForSecondFactor: false,
      defaultSecondFactor: false,
      verification: [
        // _Verification
      ],
      linkedTo: [],
    },
  ],
  externalAccounts: [
    // _ExternalAccount
    {
      id: "eac_2XPNPYQe5eiX0t395NVyiyI0dj7",
      provider: "oauth_linkedin_oidc",
      identificationId: "idn_2XPNPYhoVsLOA757SJq54nctOMa",
      externalId: "zmYq2wvVCV",
      approvedScopes: "email openid profile",
      emailAddress: "johncarmack@me.com",
      firstName: "John",
      lastName: "Carmack",
      imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL21lZGlhLmxpY2RuLmNvbS9kbXMvaW1hZ2UvQzREMDNBUUVEQ2t2S1c2Sk5TZy9wcm9maWxlLWRpc3BsYXlwaG90by1zaHJpbmtfMTAwXzEwMC8wLzE2NDczOTMzMzE3OTk/ZT0xNzA0OTMxMjAwXHUwMDI2dj1iZXRhXHUwMDI2dD1sa0NMTUR3YkRIcnhsc2NaMTFGaXRQMDJZTHJxLXBHMVNmOWVkWmMyb2xBIiwicyI6Im50eTBtaHJzdkpOSFBiTW9PNzdPNlJVbERuMjN6U3Z3aFBLTG9zSFFHT2MifQ",
      username: null,
      publicMetadata: {},
      label: null,
      verification: [
        // _Verification
      ],
    },
  ],
};

export default async function insertUser() {
  console.log("insertUser");
  const { userId } = auth();
  console.log("userId", userId);
  if (!userId) redirect(`/sign-in`);
  const clerkUser = await currentUser();
  if (!clerkUser) return redirect(`/sign-in`);

  console.log(clerkUser);

  // index
  const user = insertUserSchema.parse({
    id: userId,
  });

  // display-name
  insertUserNameSchema.parse({
    id: UserNameTable.id,
    user_id: userId,
    name: clerkUser?.firstName + " " + clerkUser?.lastName,
  });

  const emailAddresses = [];

  for (const emailAddress of clerkUser?.emailAddresses) {
    emailAddresses.push({
      id: emailAddress.id,
      user_id: userId,
      email: emailAddress.emailAddress,
    });
  }

  // email
  insertUserEmailSchema.parse({
    id: clerkUser?.primaryEmailAddressId,
    user_id: userId,
    email: clerkUser?.emailAddresses[0].emailAddress,
    is_primary: true,
  });

  // link
  // name
  // phone
  // title
  // address
  // const insertedId = (
  //   await db
  //       .insert(UsersTable)
  //       .values(user)
  //       .returning({ insertedId: ResumeTable.id })
  //   )[0].insertedId;
  //   if (!insertedId) return null;
  //   return insertedId;
}

export type InsertUserFunction = typeof insertUser;
