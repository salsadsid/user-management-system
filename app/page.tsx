"use client";
import { UserTable } from "@/components/user-table/UserTable";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

  const [search, setSearch] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    const lowerSearch = search.toLowerCase();
    return data.filter(
      (user: any) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
    );
  }, [data, search]);

  return (
    <div className="flex flex-col justify-center p-4">
      <main className="mb-4 text-xl font-bold">Hello User Dashboard</main>
      <input
        type="text"
        placeholder="Search by name, username, or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
      />
      {isLoading && <div>Loading users...</div>}
      {error && <div className="text-red-500">Error loading users</div>}
      {data && <UserTable data={filteredData} />}
    </div>
  );
}
