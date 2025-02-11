<template>
  <div class="bg-def text">
    <div class="mx-auto px-4 py-8">
      <div class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/2 px-4 mb-8">
          <transition mode="out-in" name="fade">
            <img
              :src="activeImage"
              alt="Product"
              class="object-cover max-h-[70vh] w-full rounded-xl shadow-md mb-4"
              id="mainImage"
            />
          </transition>
          <div class="flex gap-4 py-4 justify-center overflow-x-auto">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              :alt="'Thumbnail ' + (index + 1)"
              class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
              :class="{ 'opacity-100': activeImage === image }"
              @click="setActiveImage(image)"
            />
          </div>
        </div>

        <div class="w-full md:w-1/2 px-4">
          <div class="flex items-start space-x-2 mb-2">
            <div class="text-3xl font-bold">{{ product.title }}</div>
            <div class="text-sm font-medium text-gray-500 mt-1">
              {{ formatCategory(product.category) }}
            </div>
          </div>
          <div class="flex space-x-2 items-start mb-4">
            <span class="text-2xl font-bold">${{ product.price }}</span>
            <span class="text-gray-500 line-through"
              >${{ (product.price * (1 + product.discountPercentage / 100)).toFixed(2) }}</span
            >
          </div>
          <div class="flex items-center mb-4">
            <svg
              v-for="index in 5"
              :key="index"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
              :class="index <= Math.round(product.rating) ? 'text-yellow-500' : 'text-gray-300'"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="ml-2 text-gray-600 dark:text-gray-500"
              >{{ product.rating }} ({{ product.reviews.length }} reviews)</span
            >
          </div>
          <p class="text-gray-700 dark:text-gray-500 mb-6">{{ product.description }}</p>

          <div class="mb-6">
            <label
              for="quantity"
              class="block text-sm font-medium text-gray-700 dark:text-gray-500 mb-1"
              >Quantity:</label
            >
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value="1"
              class="w-12 text-center rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 text bg-def shadow-lg focus:ring-opacity-50"
            />
          </div>

          <div class="flex space-x-4 mb-6">
            <button
              class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 space-x-2">
        <div v-for="(review, index) in product.reviews" :key="index">
          <figure class="relative rounded-2xl p-6 shadow-xl shadow-slate-900/10 text bg-def-600">
            <blockquote class="relative">
              <p class="text-lg tracking-tight">
                {{ review.comment }}
              </p>
            </blockquote>
            <figcaption
              class="relative mt-6 flex items-end justify-between border-t border-slate-100 pt-6"
            >
              <div>
                <div class="font-display text-base">{{ review.reviewerName }}</div>
                <div class="mt-1 text-sm text-slate-500">{{ review.reviewerEmail }}</div>
              </div>
              <div class="overflow-hidden text-end">
                <div class="flex items-center">
                  <svg
                    v-for="starIndex in 5"
                    :key="starIndex"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                    :class="
                      starIndex <= Math.round(review.rating) ? 'text-yellow-500' : 'text-gray-300'
                    "
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div>{{ formatDate(review.date) }}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { useProductsStore } from "@/stores/products"
import { formatCategory } from "@/services"

const route = useRoute()
const id = route.params.id
const productsStore = useProductsStore()
const product = await productsStore.getProduct(id)

const activeImage = ref(product.images[0])

const setActiveImage = (image: string) => {
  activeImage.value = image
}

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString)

  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  const year = date.getUTCFullYear()

  return `${day}.${month}.${year}`
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 100;
}
</style>
