"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/category/CategoryColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";

const Category = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const res = await fetch("/api/category", {
        method: "GET",
      });
      const data = await res.json();
      setCategory(data);
      setLoading(false);
    } catch (err) {
      console.log("[category_GET]", err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <p className="text-heading2-bold text-black">Categories</p>
        <Button className="bg-blue-1 text-white " onClick={() => router.push("/category/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Category
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={category} searchKey="title" />
    </div>
  );
};

export default Category;
