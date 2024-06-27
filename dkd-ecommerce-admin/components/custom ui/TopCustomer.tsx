import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import Customer from "@/lib/models/Customer";

const TopCustomer = async () => {
  const customers = await Customer.find().sort({ createdAt: "desc" }).limit(5);

  return (
    <div className="py-5">
      <p className="text-heading2-bold text-black">Top Customers</p>
      <DataTable columns={columns} data={customers} searchKey="name" />
    </div>
  );
};

export default TopCustomer;
