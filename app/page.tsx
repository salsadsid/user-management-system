"use client";
import { Button } from "@/components/ui/button";
import { UserTable } from "@/components/user-table/UserTable";
import { useQuery } from "@tanstack/react-query";

function fetchUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
    res.json()
  );
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (data) {
    console.log("Fetched users:", data);
  }
  return (
    <div className="flex flex-col justify-center p-4">
      <main className="mb-4 text-xl font-bold">Hello User Dashboard</main>
      <Button className="mb-4">Search</Button>
      {isLoading && <div>Loading users...</div>}
      {error && <div className="text-red-500">Error loading users</div>}
      {data && <UserTable data={data} />}
    </div>
  );
}
