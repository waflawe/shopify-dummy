export type UserType = {
  id?: number
  username?: string
  firstName?: string
  image?: string
}

export enum AlertThemes {
  SUCCESS = "SUCCESS",
  LOADING = "LOADING",
  ERROR = "ERROR",
}

export enum AlertExitModes {
  AUTO = "AUTO",
  DEFAULT = "DEFAULT",
}

export type LoginResponseType = {
  id: number
  username: string
  firstName: string
  image: string
  accessToken: string
  refreshToken: string
}

export type CurrentAuthenticatedUserResponseType = {
  [key: string]: string | number | { (key: string): string }
}

export type UserExtendedDataType = {
  username: string
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: "female" | "male"
  email: string
  phone: string
  address: {
    address: string
    city: string
    country: string
  }
  bank: {
    cardExpire: string
    cardNumber: string
  }
}

export type ReviewType = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export type ProductType = {
  id: number
  title: string
  description: string
  price: number
  category: string
  discountPercentage: number
  rating: number
  thumbnail: string
  images: Array<string>
  reviews: Array<ReviewType>
}

export type ProductSortOptionsType = {
  titleAsc: string
  titleDesc: string
  ratingAsc: string
  ratingDesc: string
  priceAsc: string
  priceDesc: string
  discountPercentageAsc: string
  discountPercentageDesc: string
}

export enum ProductsOrder {
  ASC = "asc",
  DESC = "desc",
}

export type ProductsQuery = {
  search?: string
  category?: string
  sortBy?: string
  order?: string
  page?: number
}

export type ProductCartType = {
  id: number
  title: string
  quantity: number
  total: number
  discountedTotal: number
  discountPercentage: number
  thumbnail: string
}

export type CartType = {
  id: number
  products: ProductCartType[]
  total: number
  discountedTotal: number
  totalProducts: number
  totalQuantity: number
}
