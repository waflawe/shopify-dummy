<template>
  <DialogTemplate
    @exitDialog="open = false"
    ref="template"
    successMessage="Success update your account."
  />
  <DialogRoot v-model:open="open">
    <DialogTrigger class="btn-def-outline w-[95%] mx-auto flex justify-center">
      Edit account
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black bg-opacity-70 fixed inset-0 z-30" />
      <DialogContent
        class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-def p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text m-0 text-[17px] font-semibold"> Update account </DialogTitle>
        <DialogDescription class="text-gray-500 mt-[10px] mb-5 text-sm leading-normal">
          Please fill in this fields to update your account.
        </DialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="name">Email</label>
          <input
            id="email"
            v-model="email"
            ref="emailInput"
            @keyup.down="$refs.phoneInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">Phone</label>
          <input
            id="phone"
            v-model="phone"
            ref="phoneInput"
            @keyup.up="$refs.emailInput.focus()"
            @keyup.down="$refs.addressInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">Address</label>
          <input
            id="address"
            v-model="address"
            ref="addressInput"
            @keyup.up="$refs.phoneInput.focus()"
            @keyup.down="$refs.cityInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">City</label>
          <input
            id="city"
            v-model="city"
            ref="cityInput"
            @keyup.up="$refs.addressInput.focus()"
            @keyup.down="$refs.countryInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">Country</label>
          <input
            id="country"
            v-model="country"
            ref="countryInput"
            @keyup.up="$refs.cityInput.focus()"
            @keyup.down="$refs.cardNumberInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">Card number</label>
          <input
            id="cardNumber"
            v-model="cardNumber"
            ref="cardNumberInput"
            @keyup.up="$refs.countryInput.focus()"
            @keyup.down="$refs.cardExpireInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">Card expire</label>
          <input
            id="cardExpire"
            v-model="cardExpire"
            ref="cardExpireInput"
            @keyup.up="$refs.cardNumberInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <button class="btn-success-outline" type="button" @click="update">Update</button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.ts"
import { ref } from "vue"
import type { UserExtendedDataType } from "~/types"
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui"

const props = defineProps<{
  user: UserExtendedDataType
}>()

const authStore = useAuthStore()
const open = ref(false)
const template = ref(null)

const email = ref(props.user.email)
const phone = ref(props.user.phone)
const address = ref(props.user.address.address)
const city = ref(props.user.address.city)
const country = ref(props.user.address.country)
const cardNumber = ref(props.user.bank.cardNumber)
const cardExpire = ref(props.user.bank.cardExpire)

const callback = async () =>
  await authStore.updateAccount({
    email: email.value,
    phone: phone.value,
    address: {
      address: address.value,
      city: city.value,
      country: country.value,
    },
    bank: {
      cardNumber: cardNumber.value,
      cardExpire: cardExpire.value,
    },
  })

const update = async () => await template.value.submit(callback)
</script>
