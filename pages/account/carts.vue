<template>
  <Alert
    title="Loading"
    message="Please, wait..."
    :theme="AlertThemes.LOADING"
    :mode="AlertExitModes.DEFAULT"
    v-if="loading"
  />
  <Alert
    title="Success"
    message="Success remove cart"
    :theme="AlertThemes.SUCCESS"
    :mode="AlertExitModes.AUTO"
    @exited="showSuccessAlert = false"
    v-if="showSuccessAlert"
  />
  <div class="bg-def text p-10 flex flex-col space-y-5">
    <div class="bg-def-600 p-5 shadow-lg rounded-xl" v-for="cart in carts" :key="cart.id">
      <div class="flex justify-between items-end mb-4">
        <h2 class="text-2xl font-bold">Cart #{{ cart.id }}</h2>
        <div class="btn-danger-outline h-auto" @click="deleteCart(cart.id)">Delete cart</div>
      </div>
      <div class="grid grid-cols-4 gap-x-10 gap-y-5">
        <NuxtLink
          :to="{ name: 'product-id', params: { id: product.id } }"
          class="col-span-1 w-full h-full"
          v-for="product in cart.products"
          :key="product.id"
        >
          <div
            class="mx-auto w-full transition-all overflow-hidden rounded-lg bg-def shadow-md duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            <img
              class="h-48 w-full object-cover object-center"
              :src="product.thumbnail"
              alt="Product Image"
            />
            <div class="p-4">
              <h2 class="mb-0.5 text-lg font-medium dark:text-white text-gray-900">
                {{ product.title }}
              </h2>
              <p class="text-sm dark:text-gray-300 text-gray-700 mb-2">x{{ product.quantity }}</p>
              <div class="flex items-center">
                <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                  ${{ product.price }}
                </p>
                <p class="text-sm font-medium text-gray-500 line-through dark:text-gray-300">
                  ${{ (product.price * (1 + product.discountPercentage / 100)).toFixed(2) }}
                </p>
                <p class="ml-auto text-base font-medium text-green-500">
                  {{ product.discountPercentage }}% off
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="flex justify-between mt-4">
        <p class="text-lg font-bold">Total price: ${{ cart.total }}.</p>
        <p class="text-lg font-bold">Price with discount: ${{ cart.discountedTotal }}.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartsStore } from "~/stores/carts"
import { useQuery } from "@pinia/colada"
import { AlertExitModes, AlertThemes } from "~/types"

const cartsStore = useCartsStore()
const { data: carts } = useQuery({
  key: ["carts"],
  query: async () => await cartsStore.getCarts(),
})
const showSuccessAlert = ref(false)
const loading = ref(false)

const deleteCart = async (id: number) => {
  loading.value = true
  await cartsStore.deleteCart(id)
  loading.value = false
  showSuccessAlert.value = true
}

definePageMeta({
  middleware: "auth",
})
</script>
