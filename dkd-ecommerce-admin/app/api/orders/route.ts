import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/mongoDB";

import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const orders = await Order.find().sort({ createdAt: "desc" })

    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({ clerkId: order.customerClerkId })

      return {
        _id: order._id,
        customer: `${order.customer.firstName} ${order.customer.lastName}`,
        address: `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.province}`,
        products: order.cartItems.length,
        total: order.total,
        createdAt: format(order.createdAt, "MMM do, yyyy")
      }
    }))

    if (!orderDetails) {
      return new NextResponse(
        JSON.stringify({ message: "Order not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(orderDetails), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[orders_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";
