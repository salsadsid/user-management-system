"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UserTable } from "@/components/user-table/UserTable";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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

  const [searchInput, setSearchInput] = React.useState("");
  const [query, setQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    const lowerSearch = query.toLowerCase();
    return data.filter(
      (user: any) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
    );
  }, [data, query]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="-ml-1">
            <h1 className="text-2xl font-semibold">User Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage and view users
            </p>
          </div>
        </header>

        <motion.div
          className="bg-white shadow rounded-lg p-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setQuery(searchInput.trim());
                  }
                }}
              />
              <Button
                variant="default"
                onClick={() => setQuery(searchInput.trim())}
              >
                Search
              </Button>
            </div>
          </div>

          {isLoading && (
            <div className="grid gap-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
          {error && (
            <div className="p-4 border rounded bg-red-50 text-red-700">
              <div className="font-semibold">Failed to load users</div>
              <div className="text-sm">
                Please try again or check your network.
              </div>
            </div>
          )}
          {data && <UserTable data={filteredData} />}
        </motion.div>
      </div>
    </div>
  );
}
