"use client";
import { useState, useEffect } from "react";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Checkout = () => {
  const { user } = useUser();
  console.log(user)
  const cart = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [shippingRate, setShippingRate] = useState(0);
  const [selectedRegionID, setSelectedRegionID] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [totalRounded, setTotalRounded] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    address: "",
    orderNotes: "",
    paymentMethod: "cash-on-delivery",
  });

  const [regionData, setRegionData] = useState([]);
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [barangayData, setBarangayData] = useState([]);

  const subtotal = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const subtotalRounded = parseFloat(subtotal.toFixed(2));

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cart.cartItems, router]);

  useEffect(() => {
    if (user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    if (formValues.barangay) {
      calculateShippingRate();
    }
  }, [selectedRegionID, selectedCityName, selectedProvinceName]);

  useEffect(() => {
    setTotalRounded(subtotalRounded + shippingRate);
  }, [subtotalRounded, shippingRate]);

  const fetchRegions = () => {
    regions().then((regions: any) => {
      const correctedRegions = regions.map((region: any) => {
        if (
          region.region_name.toLowerCase() === "region ix (zamboanga peninzula)"
        ) {
          return {
            ...region,
            region_name: "Region IX (Zamboanga Peninsula)",
          };
        }
        return region;
      });
      setRegionData(correctedRegions);
    });
  };

  const handleRegionChange = (regionName: any) => {
    const selectedRegion: any = regionData.find(
      (region: any) => region.region_name === regionName
    );
    if (selectedRegion) {
      setSelectedRegionID(selectedRegion.id);
      provinces(selectedRegion.region_code).then((province: any) =>
        setProvinceData(province)
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        region: regionName,
        province: "",
        city: "",
        barangay: "",
      }));
    } else {
      setSelectedRegionID("");
      setProvinceData([]);
    }
  };

  const handleProvinceChange = (provinceName: any) => {
    const selectedProvince: any = provinceData.find(
      (province: any) => province.province_name === provinceName
    );
    if (selectedProvince) {
      setSelectedProvinceName(selectedProvince.province_name);
      cities(selectedProvince.province_code).then((city: any) =>
        setCityData(city)
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        province: provinceName,
        city: "",
        barangay: "",
      }));
    } else {
      setCityData([]);
    }
  };

  const handleCityChange = (cityName: any) => {
    const selectedCity: any = cityData.find(
      (city: any) => city.city_name === cityName
    );
    if (selectedCity) {
      setSelectedCityName(selectedCity.city_name);
      barangays(selectedCity.city_code).then((barangay: any) =>
        setBarangayData(barangay)
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        city: cityName,
        barangay: "",
      }));
    } else {
      setBarangayData([]);
    }
  };

  const handleBrgyChange = (brgyName: any) => {
    const selectedBgry: any = barangayData.find(
      (brgy: any) => brgy.brgy_name === brgyName
    );
    if (selectedBgry) {
      setFormValues((prevValues) => ({
        ...prevValues,
        barangay: brgyName,
      }));
      calculateShippingRate();
    }
  };

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const calculateShippingRate = () => {
    setLoading(true);

    setTimeout(() => {
      const baseRate = 0;
      let rate = baseRate;

      const selectedRegion: any = regionData.find(
        (region: any) => region.id === selectedRegionID
      );
      if (selectedRegion) {
        const regionId = selectedRegion.id;

        if ([1, 2, 3, 4, 5, 6, 14, 15].includes(regionId)) {
          rate = 190;
        } else if ([7, 8, 9].includes(regionId)) {
          rate = 140;
        } else if ([10, 11, 12, 13, 16, 17].includes(regionId)) {
          rate = 120;
        }
      }

      if (selectedCityName.toLowerCase() === "zamboanga city") {
        rate = 0;
      } else if (selectedProvinceName.toLowerCase() === "zamboanga del sur") {
        rate = 50;
      }

      setShippingRate(rate);
      setLoading(false);
    }, 2000);
  };

  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();
    setLoadingOrder(true);

    const orderData = {
      customerClerkId: {
        id:user?.id,
        name:user?.fullName,
        email:user?.emailAddresses[0].emailAddress,
      },
      cartItems: cart.cartItems,
      customer: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
      },
      shippingAddress: {
        address: formValues.address,
        region: formValues.region,
        province: formValues.province,
        city: formValues.city,
        barangay: formValues.barangay,
      },
      orderNotes: formValues.orderNotes,
      paymentMethod: formValues.paymentMethod,
      total: totalRounded,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        const session = await response.json();
        router.push("/order_success");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error during order placement", error);
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center py-8 px-5 mx-auto mb-10">
      <h1 className="text-heading2-bold mb-5">Checkout</h1>

      <form
        className="w-full flex flex-col justify-center lg:flex-row gap-6"
        onSubmit={handlePlaceOrder}
      >
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Personal Information</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formValues.firstName}
                onChange={handleChange}
                className="border p-3 rounded-md flex-1"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formValues.lastName}
                onChange={handleChange}
                className="border p-3 rounded-md flex-1"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formValues.phoneNumber}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              required
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Shipping Address</h2>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name (optional)"
              value={formValues.companyName}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mb-4"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <Select onValueChange={handleRegionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  {regionData.map((region: any) => (
                    <SelectItem
                      key={region.region_code}
                      value={region.region_name}
                    >
                      {region.region_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={handleProvinceChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  {provinceData.map((province: any) => (
                    <SelectItem
                      key={province.province_code}
                      value={province.province_name}
                    >
                      {province.province_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select onValueChange={handleCityChange}>
              <SelectTrigger className="w-full mt-4">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cityData.map((city: any) => (
                  <SelectItem key={city.city_code} value={city.city_name}>
                    {city.city_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={handleBrgyChange}>
              <SelectTrigger className="w-full mt-4">
                <SelectValue placeholder="Select Barangay" />
              </SelectTrigger>
              <SelectContent>
                {barangayData.map((barangay: any) => (
                  <SelectItem
                    key={barangay.brgy_code}
                    value={barangay.brgy_name}
                  >
                    {barangay.brgy_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <input
              type="text"
              name="address"
              placeholder="Address Line"
              value={formValues.address}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              required
            />
            <textarea
              name="orderNotes"
              placeholder="Order Notes (optional)"
              value={formValues.orderNotes}
              onChange={handleChange}
              className="border p-3 rounded-md w-full mt-4"
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Order Summary</h2>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="flex justify-between gap-10 mb-2 text-nowrap"
              >
                <span>
                  {cartItem.quantity}x - {cartItem.item.title}
                </span>
                <span>
                  ₱{" "}
                  {cartItem.item.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            ))}
            <Separator className="bg-gray-300 my-4" />
            <div className="flex justify-between mt-4">
              <span>Subtotal:</span>
              <span>
                ₱{" "}
                {subtotalRounded.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Shipping:</span>
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 animate-spin stroke-red-400"
                    viewBox="0 0 256 256"
                  >
                    <line
                      x1="128"
                      y1="32"
                      x2="128"
                      y2="64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                  <span className="text-4xl font-medium text-gray-500">
                    Loading...
                  </span>
                </span>
              ) : (
                <span>
                  ₱{" "}
                  {shippingRate.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>
            <div className="flex justify-between mt-4 font-bold">
              <span>Total:</span>
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 animate-spin stroke-red-400"
                    viewBox="0 0 256 256"
                  >
                    <line
                      x1="128"
                      y1="32"
                      x2="128"
                      y2="64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                  <span className="text-4xl font-medium text-gray-500">
                    Loading...
                  </span>
                </span>
              ) : (
                <span>
                  ₱{" "}
                  {totalRounded.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-md shadow-lg p-6">
            <h2 className="text-heading4-bold mb-4">Payment Method</h2>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="paymentMethod"
                value="cash-on-delivery"
                checked={formValues.paymentMethod === "cash-on-delivery"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              <label
                htmlFor="cash-on-delivery"
                className="text-body-bold cursor-pointer"
              >
                Cash on Delivery
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-700 text-white rounded-md py-3 w-full text-center transform transition duration-300 hover:bg-red-700 cursor-not-allowed"
            disabled
          >
            {loadingOrder ? "Placing Order..." : "Placing Order Under Maintenance"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
