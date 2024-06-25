import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColums"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"

const OrderDetails = async ({ params }: { params: { orderId: string }}) => {
  const res = await fetch(`${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`)
  const { orderDetails } = await res.json()

  const { city, province, barangay, address } = orderDetails.shippingAddress

  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{orderDetails.customer.firstName} {orderDetails.customer.lastName}</span>
      </p>
      <p className="text-base-bold">
        Shipping address: <span className="text-base-medium">{address} ({barangay}, {city}, {province})</span>
      </p>
      <p className="text-base-bold">
        Total Amount: <span className="text-base-medium">₱{orderDetails.total}</span>
      </p>
      <DataTable columns={columns} data={orderDetails.cartItems} searchKey="product"/>
    </div>
  )
}

export default OrderDetails