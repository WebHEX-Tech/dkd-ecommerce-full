"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return row.original.category.map((category) => category.title).join(", ");
    },
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => {
      return row.original.collections.map((collection) => collection.title).join(", ");
    },
  },
  {
    accessorKey: "price",
    header: "Price (₱)",
    cell: ({ row }) => {
      return row.original.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
    },
  },
  {
    accessorKey: "sales",
    header: "Sales",
    cell: ({ row }) => {
      return row.original.sales || 0;
    },
  },
  {
    accessorKey: "stocks",
    header: "Stocks",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const stocks = row.original.stocks;

      if (stocks === 0) {
        return <div className="bg-red-500 text-white py-1 px-3 rounded-2xl w-fit"><span>Out of Stock</span></div>;
      } else if (stocks < 10) {
        return <div className="bg-yellow-500 text-white py-1 px-3 rounded-2xl w-fit"><span>In Stock</span></div>;
      } else {
        return <div className="bg-green-500 text-white py-1 px-3 rounded-2xl w-fit"><span>In Stock</span></div>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
