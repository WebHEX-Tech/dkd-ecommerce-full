"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/orders/${row.original._id}`}
          className="hover:text-red-1"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "address",
    header: "Shipping Address",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "total",
    header: "Total (₱)",
    cell: ({ row }) => {
      return row.original.total.toLocaleString('en-US', { minimumFractionDigits: 2 });
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
