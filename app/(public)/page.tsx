import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "../login/page";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token");

  if (token) {
    redirect("/projects/new");
  }

  return <Login />;
}
