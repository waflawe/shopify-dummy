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
    state: string
    country: string
  }
  bank: {
    cardExpire: string
    cardNumber: string
  }
}
