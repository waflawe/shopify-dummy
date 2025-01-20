import { type CurrentAuthenticatedUserResponseType, type UserExtendedDataType } from "@/types"

export const transformResponseToUserExtendedData = (
  response: CurrentAuthenticatedUserResponseType
): UserExtendedDataType => {
  return {
    username: response.username,
    firstName: response.firstName,
    lastName: response.lastName,
    maidenName: response.maidenName,
    age: response.age,
    gender: response.gender,
    email: response.email,
    phone: response.phone,
    address: {
      address: response.address.address,
      city: response.address.city,
      country: response.address.country,
    },
    bank: {
      cardExpire: response.bank.cardExpire,
      cardNumber: response.bank.cardNumber,
    },
  } as UserExtendedDataType
}

export const formatCategory = (input: string): string => {
  return input
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
