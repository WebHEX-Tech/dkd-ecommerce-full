"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link
          href={`/products/${row.original.product._id}`}
          className="hover:text-red-1"
        >
          {row.original.product.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price (₱)",
    cell: ({ row }) => {
      const product = Array.isArray(row.original.product)
        ? row.original.product[0]
        : row.original.product;

      return product.price.toLocaleString('en-US', { minimumFractionDigits: 2 });
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price (₱)",
    cell: ({ row }) => {
      const prices: any = Array.isArray(row.original.product)
        ? row.original.product.map((product) => product.price)
        : [row.original.product.price];

        const totalPrice = prices * row.original.quantity;

        return totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 });
    },
  },
];
