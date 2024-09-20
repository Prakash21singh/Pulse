import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
async function getUser() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function () {
  const session = await getUser();
  console.log({ session });

  return <div>{JSON.stringify(session?.user)}</div>;
}
