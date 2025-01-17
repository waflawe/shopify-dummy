<template>
  <main class="bg-def text px-20 py-10" style="height: calc(100vh - 3.5rem)">
    <div class="flex items-start gap-x-5" v-if="user">
      <section class="w-1/4 hover:shadow hover:shadow-black/50 rounded bg-def-600">
        <img
          class="w-1/2 mx-auto my-5"
          :alt="authStore.user.username + ' avatar'"
          :src="authStore.user.image"
        />
        <div class="space-y-1.5 mb-1.5">
          <EditAccountDialog :user="user" />
          <DeleteAccountAlert />
        </div>
      </section>
      <section class="w-3/4 hover:shadow hover:shadow-black/50 rounded bg-def-600 p-3">
        <div
          class="border-b-2 border-black dark:border-gray-50 pb-1.5 text text-xl flex justify-between"
        >
          <div>{{ user.firstName }} {{ user.maidenName }} {{ user.lastName }}</div>
          <div class="text-sm text-gray-500 flex items-end">{{ user.email }} {{ user.phone }}</div>
        </div>
        <div class="text-lg text flex pt-1 items-center justify-center">
          <div>@{{ user.username }}</div>
          <Separator
            class="mx-[10px] border border-black dark:border-gray-50"
            orientation="vertical"
          />
          <div>{{ user.age }}</div>
          <Separator
            class="mx-[10px] border border-black dark:border-gray-50"
            orientation="vertical"
          />
          <div
            class="size-6"
            :class="{
              'text-blue-500': user.gender === 'male',
              'text-pink-500': user.gender === 'female',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              v-if="user.gender === 'male'"
              class="me-auto"
            >
              <path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
              <path d="M19 5l-5.4 5.4"></path>
              <path d="M19 5h-5"></path>
              <path d="M19 5v5"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              v-else-if="user.gender === 'female'"
              class="me-auto"
            >
              <path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
              <path d="M12 14v7"></path>
              <path d="M9 18h6"></path>
            </svg>
          </div>
        </div>
        <div class="justify-center mt-1 flex text">
          <div>
            Delivery address: {{ user.address.country }}, {{ user.address.city }},
            {{ user.address.address }}
          </div>
        </div>
        <div class="mx-auto max-w-lg mt-5">
          <div class="bg-def rounded-lg overflow-hidden shadow-lg shadow-black/50">
            <div class="px-6 py-4">
              <div class="flex justify-between items-center">
                <img
                  class="h-8"
                  src="https://www.svgrepo.com/show/499847/company.svg"
                  alt="Workflow logo"
                />
                <span class="font-medium text-gray-500">{{ user.bank.cardExpire }}</span>
              </div>
              <div class="mt-4">
                <div class="font-bold text text-xl">{{ cardNumber }}</div>
                <div class="flex justify-between items-center mt-2">
                  <div class="text-sm uppercase text-gray-500">
                    {{ user.firstName }} {{ user.lastName }}
                  </div>
                  <img
                    class="h-10 w-10"
                    src="https://www.svgrepo.com/show/362011/mastercard.svg"
                    alt="Mastercard logo"
                  />
                </div>
              </div>
            </div>
            <div class="bg-gray-100 dark:bg-[#121212] px-6 py-4">
              <div class="font-medium text-gray-500">CARD VERIFICATION VALUE</div>
              <div class="text-lg font-bold text mt-2">***</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@pinia/colada"
import { useAuthStore } from "@/stores/auth.ts"
import { Separator } from "reka-ui"
import { onBeforeUpdate } from "vue"
import DeleteAccountAlert from "~/components/DeleteAccountAlert.vue"

const authStore = useAuthStore()

const { data: user } = useQuery({
  key: ["getMe"],
  query: async () => (await authStore.getMe())!,
})

let cardNumber = "0000 0000 0000 0000"

onBeforeUpdate(() => {
  cardNumber = user.value ? user.value!.bank.cardNumber.match(/.{1,4}/g)?.join(" ") : cardNumber
})
</script>
