import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    await connectToDB();

    const searchRegex = new RegExp(params.query, "i");

    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: searchRegex } },
        {
          category: {
            $elemMatch: {
              title: { $regex: searchRegex },
            },
          },
        },
        {
          collections: {
            $elemMatch: {
              title: { $regex: searchRegex },
            },
          },
        },
        { tags: { $in: [searchRegex] } }, // $in is used to match an array of values
      ],
    });

    return NextResponse.json(searchedProducts, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS", 
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept", 
      },
    });
  } catch (err) {
    console.log("[search_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
