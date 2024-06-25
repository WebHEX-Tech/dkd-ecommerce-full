import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";
import Category from "@/lib/models/Category";

export const POST = async (req: NextRequest) => {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 403 });
    // }
    await connectToDB();

    const { title, collections } = await req.json();

    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const newCategory = await Category.create({
      title,
      collections,
    });

    await newCategory.save();

    return NextResponse.json(newCategory, { status: 200 });
  } catch (err) {
    console.log("[category_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const category = await Category.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

      if (!category) {
        return new NextResponse(
          JSON.stringify({ message: "Category not found" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify(category), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
  } catch (err) {
    console.log("[category_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
