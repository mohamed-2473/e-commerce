export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  quantity: number; // used for cart
  minimumOrderQuantity: number;
  availabilityStatus: string;
  returnPolicy: string;
  warrantyInformation: string;
  shippingInformation: string;

  weight: number;
  dimensions: Dimensions;

  tags: string[];
  features: any;   // you can define a better interface if structure is known
  colors: any;     // same here – if you know the type, use it

  images: string[];
  thumbnail: string;

  reviews: Review[];
  meta: Meta;
}
