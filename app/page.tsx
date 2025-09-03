"use client";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col  justify-center ">
      <main>Hello User Dashboard</main>
      <Button>Search</Button>
    </div>
  );
}
