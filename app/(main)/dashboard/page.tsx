import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not logged in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to logged in users
  }

  // Get the User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements
  const name = `${user?.firstName} ${user?.lastName}`;
  const initials = `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`;
  return (
    <main className="w-full max-w-3xl">
      {user?.hasImage ? (
        <Avatar className="float-right h-64 w-64">
          <AvatarImage alt={name} src={user?.imageUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ) : null}
      <h2 className="text-4xl font-bold tracking-wider">{name}</h2>
      <pre>ID: {JSON.stringify(user?.id, null, 2)}</pre>
      {/* <pre>Email: {JSON.stringify(user?.primaryEmailAddressId, null, 2)}</pre> */}
      <div>
        Email:
        {
          user?.emailAddresses.find(
            ({ id }) => id === user?.primaryEmailAddressId,
          )?.emailAddress
        }
      </div>
      {/* <div>
        Emails:
        <br />
        {user?.emailAddresses.map((email) => (
          <pre key={email.id}>{JSON.stringify(email, null, 2)}</pre>
        ))}
      </div> */}
      <div>
        Phone:
        {
          user?.phoneNumbers.find(({ id }) => id === user?.primaryPhoneNumberId)
            ?.phoneNumber
        }
      </div>
      {/* <div>
        Phones:
        {user?.phoneNumbers.map((phone) => (
          <pre key={phone.id}>{JSON.stringify(phone, null, 2)}</pre>
        ))}
      </div> */}
    </main>
  );
}
