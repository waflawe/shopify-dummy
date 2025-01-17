import {type CurrentAuthenticatedUserResponseType, type UserExtendedDataType} from "@/types"

export const transformResponseToUserExtendedData = (response: CurrentAuthenticatedUserResponseType): UserExtendedDataType => {
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
