type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type CategoryType = {
  _id: string;
  title: string;
  collections: CollectionType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: CategoryType[];
  collections: CollectionType[];
  tags: [string];
  price: number;
  stocks: number;
  sizes: [string];
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType]
  shippingRate: string;
  totalAmount: number
}

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
}