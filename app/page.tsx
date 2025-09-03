"use client";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">User Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage and view users
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow">
              New User
            </button>
          </div>
        </header>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 sm:max-w-md px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30"
              />
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  /* keep as client-side filter; button emphasizes action */
                }}
              >
                Search
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Filters
              </Button>
            </div>
          </div>

          {isLoading && <div>Loading users...</div>}
          {error && <div className="text-red-500">Error loading users</div>}
          {data && <UserTable data={filteredData} />}
        </div>
      </div>
    </div>
  );
}
