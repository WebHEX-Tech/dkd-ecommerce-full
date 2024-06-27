import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import Product from "@/lib/models/Product";
import NotificationOrder from "@/lib/models/NotificationOrder";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const {
      customerClerkId,
      cartItems,
      customer,
      shippingAddress,
      paymentMethod,
      total,
    } = await req.json();

    if (
      !customerClerkId ||
      !cartItems ||
      !customer ||
      !paymentMethod ||
      !total
    ) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    if (
      !Array.isArray(cartItems) ||
      cartItems.some((items) => !items.item._id || !items.quantity)
    ) {
      return new NextResponse("Invalid cart items format", { status: 400 });
    }

    const validatedCartItems = [];

    for (const item of cartItems) {
      const productId = new mongoose.Types.ObjectId(item.item._id);
      const quantity = parseInt(item.quantity);

      const product = await Product.findById(productId);
      if (product) {
        product.stocks -= quantity;
        if (product.sales === undefined) {
          product.sales = 0;
        }
        
        product.sales += quantity;

        if (product.stocks < 0) {
          return new NextResponse(
            `Not enough stock for product ${product.title}`,
            { status: 400 }
          );
        }
        await product.save();
      } else {
        return new NextResponse(`Product with ID ${productId} not found`, {
          status: 404,
        });
      }

      validatedCartItems.push({ product: productId, quantity });
    }

    const clerkId = customerClerkId.id;

    const newOrder = new Order({
      customerClerkId: clerkId,
      cartItems: validatedCartItems,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
      },
      shippingAddress: {
        address: shippingAddress.address,
        region: shippingAddress.region,
        province: shippingAddress.province,
        city: shippingAddress.city,
        barangay: shippingAddress.barangay,
      },
      orderNotes: customer.orderNotes,
      paymentMethod,
      total,
    });

    let newCustomer = await Customer.findOne({ clerkId });

    if (!newCustomer) {
      newCustomer = new Customer({
        clerkId: customerClerkId.id,
        name: customerClerkId.name,
        email: customerClerkId.email,
        orders: [],
      });
    }

    newCustomer.orders.push(newOrder._id);

    await newOrder.save();
    await newCustomer.save();

    const newOrderNotif = new NotificationOrder({
      orderId: newOrder._id,
      customerName: `${customer.firstName} ${customer.lastName}`,
    });

    await newOrderNotif.save();

    return NextResponse.json(newOrder, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err) {
    console.error("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { cartItems, customer, paymentMethod, total } = await req.json();

//     if (!cartItems || !customer || !paymentMethod || !total) {
//       return new NextResponse("Not enough data to checkout", { status: 400 });
//     }

//     return NextResponse.json({ message: "Checkout successful" }, { headers: corsHeaders });
//   } catch (err) {
//     console.error("[checkout_POST]", err);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
