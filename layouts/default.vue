<template>
  <div class="flex flex-col relative">
    <div class="mt-14 flex-1">
      <NuxtPage />
    </div>
    <nav
      class="fixed top-0 left-0 w-full h-14 bg-slate-100 bg-opacity-100 shadow-xl dark:bg-slate-900"
    >
      <div class="h-full place-items-center flex text">
        <NuxtLink :to="{ name: 'index' }" class="ms-10 text-2xl">
          <div class="flex gap-x-1.5">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/fluency/30/pixel-heart.png"
              alt="pixel-heart"
            />
            <div>ShopifyDummy</div>
          </div>
        </NuxtLink>
        <div class="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
          <NuxtLink
            :to="{ name: 'products' }"
            class="text text-lg my-auto border-b transition-all duration-200"
            :class="{
              '!hover:border-emerald-600 !hover:text-emerald-600': route.name !== 'products',
              '!border-emerald-600 !dark:border-emerald-500 !text-emerald-600 !dark:text-emerald-500': route.name === 'products',
            }"
          >
            <p class="sawarabi">Shop</p>
          </NuxtLink>
        </div>
        <div class="ms-auto me-10 flex">
          <button class="mr-3 text" type="button" @click="toggleTheme">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              v-if="theme === 'light'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              v-if="theme === 'dark'"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
          <LoginDialog />
          <div class="flex space-x-1.5" v-if="authStore.isAuth">
            <NuxtLink :to="{ name: 'account' }" class="rounded-full my-auto size-[30px]">
              <img :src="authStore.user.image" alt="User Image" />
            </NuxtLink>
            <button class="btn-def-outline" type="button" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useCookie } from "nuxt/app"
import { useAuthStore } from "@/stores/auth.ts"
import { useRouter, useRoute } from "vue-router"
import { onMounted } from "vue"

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const theme = useCookie("theme")

authStore.init()

if (!theme.value) {
  theme.value = "light"
}

onMounted(() => {
  if (theme.value === "dark") {
    document.documentElement.classList.add("dark")
    theme.value = "dark"
  }
})

const toggleTheme = () => {
  const currentTheme = document.documentElement.classList.toggle("dark")
  theme.value = currentTheme ? "dark" : "light"
}

const logout = () => {
  if (authStore.isAuth) {
    authStore.logout()
    router.push({ name: "index" })
  }
}
</script>
