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
