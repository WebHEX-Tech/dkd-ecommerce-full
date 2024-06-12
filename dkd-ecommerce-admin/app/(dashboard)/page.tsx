import SalesChart from "@/components/custom ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { HandCoins, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();

  const graphData = await getSalesPerMonth();

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold text-black">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card className="relative text-black overflow-hidden shadow-sm">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 rounded-full  w-52 h-52 blur-3xl bg-blue-4 z-1"></div>
          <div className="absolute -top-4 -left-16 -translate-y-1/2 rounded-full  w-52 h-52 blur-3xl bg-blue-5 z-1"></div>
          <CardHeader className="flex flex-row justify-between items-center z-10">
            <CardTitle className="z-10">Total Revenue</CardTitle>
            <HandCoins className="max-sm:hidden z-10" />
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="font-normal text-[1.8rem]">₱ {totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="relative text-black overflow-hidden shadow-sm">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 rounded-full  w-52 h-52 blur-3xl bg-blue-4 z-1"></div>
          <div className="absolute -top-4 -left-16 -translate-y-1/2 rounded-full  w-52 h-52 blur-3xl bg-blue-5 z-1"></div>
          <CardHeader className="flex flex-row justify-between items-center z-10 relative">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="font-normal text-[1.8rem]">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card className="relative text-black overflow-hidden shadow-sm">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 rounded-full  w-52 h-52 blur-3xl bg-blue-4 z-1"></div>
          <div className="absolute -top-4 -left-16 -translate-y-1/2 rounded-full  w-52 h-52 blur-3xl bg-blue-5 z-1"></div>
          <CardHeader className="flex flex-row justify-between items-center z-10 relative">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="font-normal text-[1.8rem]">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10 text-black">
        <CardHeader>
          <CardTitle>Sales Chart (₱)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
