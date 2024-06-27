import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 mb-52 max-sm:px-3 h-full">
      <p className="text-heading3-bold my-10">Your Orders</p>
      <Separator className="my-6 bg-red-7" />
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">You have no orders yet.</p>
        ))}

      <div className="flex flex-col gap-10">
        {orders?.map((order: OrderType) => (
          <div key={order._id} className="flex flex-col border-b rounded-md border-gray-200 gap-8 p-4 transform transition duration-200 hover:bg-red-5">
            <div className="flex justify-between gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold text-gray-500">Order ID: {order._id || "Product Not Found"}</p>
              <p className="text-base-bold">
                Total Amount: ₱{order.total || "Product Not Found"}{" "}
                <span className="text-gray-400 font-normal text-[13px]">
                  (incl. shipping)
                </span>
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              {order.cartItems.map((orderItem: OrderItemType) => (
                <div key={orderItem._id} className="flex rounded-md bg-white p-4 gap-2 sm:gap-4">
                  <Image
                    src={orderItem.product ? orderItem.product.media[0] : ""}
                    alt={orderItem.product ? orderItem.product.title : "Product Not Found"}
                    width={100}
                    height={100}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      <span className="font-semibold">
                        {orderItem.product ? orderItem.product.title : "Product Not Found"}
                      </span>
                    </p>
                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size:{" "}
                        <span className="text-small-bold">
                          {orderItem.size || "Product Not Found"}
                        </span>
                      </p>
                    )}
                    <p className="text-small-medium">
                      Unit price:{" "}
                      <span className="text-small-bold">
                        ₱{orderItem.product ? orderItem.product.price : "Product Not Found"}
                      </span>
                    </p>
                    <p className="text-small-medium">
                      Quantity:{" "}
                      <span className="text-small-bold">
                        {orderItem.quantity || "Product Not Found"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
