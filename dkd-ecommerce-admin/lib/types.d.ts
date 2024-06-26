type UserType = {
  _id: string;
  role: string;
  firstname: string;
  lastname: string;
  username: string;
}

type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

type CategoryType = {
  _id: string;
  title: string;
  products: ProductType[];
  collections: CollectionType[];
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: CategoryType[];
  collections: CollectionType[];
  tags: [string];
  sizes: [string];
  price: number;
  stocks: number;
  sales: number;
  createdAt: Date;
  updatedAt: Date;
}

type OrderColumnType = {
  _id: string;
  customer: string;
  cartItems: number;
  total: number;
  createdAt: string;
}

type OrderItemType = {
  product: ProductType
  size: string;
  quantity: number;
}

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
  orders: OrderColumnType[];
}