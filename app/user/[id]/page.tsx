"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

function fetchUser(id: string) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
    res.json()
  );
}

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const actualParams = React.use(params);
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", actualParams.id],
    queryFn: () => fetchUser(actualParams.id),
    enabled: !!actualParams.id,
  });

  if (isLoading)
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading user...</div>
      </div>
    );
  if (error || !user || user.id === undefined)
    return <div className="p-8 text-center text-red-500">User not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center md:items-start md:col-span-1">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="mt-3 text-center md:text-left">
              <div className="text-lg font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded">
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="text-sm font-medium">{user.phone}</div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-xs text-muted-foreground">Website</div>
                <div className="text-sm font-medium">{user.website}</div>
              </div>
            </div>

            <div className="p-4 border rounded">
              <div className="text-xs text-muted-foreground">Company</div>
              <div className="text-sm font-medium">{user.company?.name}</div>
              <div className="text-sm text-muted-foreground">
                {user.company?.catchPhrase}
              </div>
            </div>

            <div className="p-4 border rounded">
              <div className="text-xs text-muted-foreground">Address</div>
              <div className="text-sm font-medium">
                {user.address?.suite} {user.address?.street},{" "}
                {user.address?.city}
              </div>
              <div className="text-sm text-muted-foreground">
                Zip: {user.address?.zipcode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
