<template>
  <main class="bg-def text px-20 py-10" style="height: calc(100vh - 3.5rem)">
    <div class="flex gap-x-5" v-if="user">
      <section class="w-1/4 hover:shadow hover:shadow-black/50 rounded bg-def-600">
        <img
          class="w-1/2 mx-auto my-5"
          :alt="authStore.user.username + ' avatar'"
          :src="authStore.user.image"
        />
        <div class="space-y-1.5 mb-1.5">
          <button class="btn-def w-[95%] mx-auto flex justify-center" type="button">
            Edit account
          </button>
          <button class="btn-error w-[95%] mx-auto flex justify-center" type="button">
            Delete account
          </button>
        </div>
      </section>
      <section class="w-3/4 hover:shadow hover:shadow-black/50 rounded bg-def-600 p-3">
        {{ user.username }}
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuery } from "@pinia/colada"
import { useAuthStore } from "@/stores/auth.ts"

const authStore = useAuthStore()

const { data: user } = useQuery({
  key: ["getMe"],
  query: async () => (await authStore.getMe())!,
})
</script>
