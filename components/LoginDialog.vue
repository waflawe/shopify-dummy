<template>
  <DialogTemplate @exitDialog="open = false" ref="template" successMessage="Success log in." />
  <DialogRoot v-model:open="open" v-if="!authStore.isAuth">
    <DialogTrigger>
      <button class="btn-def-outline" type="button">Login</button>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black bg-opacity-70 fixed inset-0 z-30" />
      <DialogContent
        class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-def p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text m-0 text-[17px] font-semibold"> Login </DialogTitle>
        <DialogDescription class="text-gray-500 mt-[10px] mb-5 text-sm leading-normal">
          Please fill in this fields to log in. Users list availible
          <a href="https://dummyjson.com/users" class="link" target="_blank">here</a>.
        </DialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="name">Username</label>
          <input
            id="username"
            v-model="username"
            ref="usernameInput"
            @keyup.down="$refs.passwordInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text w-[90px] text-right text-sm" for="username">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            ref="passwordInput"
            @keyup.up="$refs.usernameInput.focus()"
            class="text-gray-600 bg-stone-200 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-lg px-[10px] text-sm leading-none outline-none"
          />
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <button class="btn-success-outline" type="button" @click="login">Login</button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.ts"
import { ref } from "vue"
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui"

const authStore = useAuthStore()

const username = ref("")
const password = ref("")
const open = ref(false)
const template = ref(null)

const callback = async () => await authStore.login(username.value, password.value)

const login = async () => await template.value.submit(callback)
</script>
