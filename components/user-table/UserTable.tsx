"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function UserTable({ data }: { data: any[] }) {
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const columns = React.useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "username", header: "Username" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "website", header: "Website" },
    ],
    []
  );

  const pageCount = Math.ceil(data.length / pageSize);
  const pagedData = React.useMemo(() => {
    const start = page * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const table = useReactTable({
    data: pagedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();

  React.useEffect(() => {
    setPage(0);
  }, [pageSize]);

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="mb-2 flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm">
            Users per page:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <table className="min-w-full border border-gray-200 rounded">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const hideOnMobile = new Set([
                    "username",
                    "phone",
                    "website",
                  ]);
                  const respClass = hideOnMobile.has(header.id)
                    ? "hidden sm:table-cell"
                    : "";
                  return (
                    <th
                      key={header.id}
                      className={`px-4 py-2 border-b text-left ${respClass}`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-gray-50"
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/user/${row.original.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/user/${row.original.id}`);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const hideOnMobile = new Set([
                    "username",
                    "phone",
                    "website",
                  ]);
                  const respClass = hideOnMobile.has(cell.column.id)
                    ? "hidden sm:table-cell"
                    : "";
                  return (
                    <td
                      key={cell.id}
                      className={`px-4 py-2 border-b ${respClass}`}
                    >
                      {cell.column.id === "name" ? (
                        <Link
                          href={`/user/${row.original.id}`}
                          className="text-blue-600 underline cursor-pointer"
                          onClick={(e: any) => e.stopPropagation()}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          ) ?? String(cell.getValue())}
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) ?? String(cell.getValue())
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <span>
            Page {page + 1} of {pageCount}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
            disabled={page >= pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
