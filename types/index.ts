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
