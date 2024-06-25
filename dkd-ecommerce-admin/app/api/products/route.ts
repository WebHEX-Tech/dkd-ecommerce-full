import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
import Category from "@/lib/models/Category";

export const POST = async (req: NextRequest) => {
  try {
    // const { userId } = auth();

    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      price,
      stocks,
    } = await req.json();

    if (!title || !description || !media || !Array.isArray(category) || price === null || stocks === null) {
      return new NextResponse("Incomplete product data", { status: 400 });
    }

    const newProduct = new Product({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      price,
      stocks,
    });

    await newProduct.save();

    if (collections && collections.length > 0) {
      await Collection.updateMany(
        { _id: { $in: collections } },
        { $push: { products: newProduct._id } }
      );
    }

    if (category && category.length > 0) {
      await Category.updateMany(
        { _id: { $in: category } },
        { $push: { products: newProduct._id } }
      );
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.error("[products_POST]", error);

    if (error instanceof Error) {
      if (error.name === "ValidationError") {
        return new NextResponse(`Validation Error: ${error.message}`, { status: 400 });
      }
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection })
      .populate({ path: "category", model: Category });

      if (!products) {
        return new NextResponse(
          JSON.stringify({ message: "Product not found" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify(products), {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

