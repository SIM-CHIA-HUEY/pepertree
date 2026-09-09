export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVideo {
  url: string;
  alt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  size: string;
  material: string;
  price: number;
  stock: number;
  images: ProductImage[];
  videos: ProductVideo[];
}

export interface ProductsResponse {
  message: string;
  products: Product[];
}