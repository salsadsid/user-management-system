"use client";
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

  if (isLoading) return <div className="p-8">Loading user...</div>;
  if (error || !user || user.id === undefined)
    return <div className="p-8 text-red-500">User not found.</div>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <button
        className="mb-4 px-3 py-1 border rounded"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="space-y-2">
        <div>
          <strong>ID:</strong> {user.id}
        </div>
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Phone:</strong> {user.phone}
        </div>
        <div>
          <strong>Website:</strong> {user.website}
        </div>
        {user.company && (
          <div>
            <strong>Company:</strong> {user.company.name}
          </div>
        )}
        {user.address && (
          <div>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
          </div>
        )}
      </div>
    </div>
  );
}
