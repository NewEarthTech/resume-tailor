import insertUser from "@/db/actions/user/insert";
import { auth, currentUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import ClientButton from "./client-button";

export default async function Page() {
  //   const { userId } = auth();

  //   const user = await currentUser();

  return (
    <div className="mx-auto flex h-full w-full items-center justify-center">
      <ClientButton insertUser={insertUser}>Test Action</ClientButton>
    </div>
  );
}
