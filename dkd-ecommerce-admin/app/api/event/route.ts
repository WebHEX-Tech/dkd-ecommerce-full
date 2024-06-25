import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDB";
import NotificationOrder from "@/lib/models/NotificationOrder";

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        controller.close();
      };

      try {
        await connectToDB();

        // Fetch the latest notification
        const latestNotif = await NotificationOrder.findOne().sort({ createdAt: -1 });

        if (latestNotif) {
          sendEvent(JSON.stringify(latestNotif));
        } else {
          controller.close();
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const notifId = searchParams.get("id");

    if (notifId) {
      await connectToDB();

      await NotificationOrder.findByIdAndDelete(notifId);

      return new NextResponse(`Notification ${notifId} deleted`, { status: 200 });
    } else {
      return new NextResponse("Notification ID not provided", { status: 400 });
    }
  } catch (error) {
    console.error("Failed to delete notification", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
