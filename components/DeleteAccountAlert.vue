<template>
  <AlertDialogRoot>
    <AlertDialogTrigger class="btn-danger-outline w-[95%] mx-auto flex justify-center">
      Delete account
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay class="bg-black bg-opacity-70 fixed inset-0 z-30" />
      <AlertDialogContent
        class="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-def p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <AlertDialogTitle class="text m-0 text-[17px] font-semibold">
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription class="text-gray-500 mt-[10px] mb-5 text-sm leading-normal">
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </AlertDialogDescription>
        <div class="flex justify-end gap-4">
          <AlertDialogCancel
            class="inline-flex h-[35px] items-center justify-center btn-success-outline"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            class="inline-flex h-[35px] items-center justify-center btn-danger-outline"
            @click="deleteAccount"
          >
            Yes, delete account
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "reka-ui"
import { useAuthStore } from "@/stores/auth.ts"
import { useRouter } from "vue-router"

const router = useRouter()
const authStore = useAuthStore()

const deleteAccount = () => {
  const status = authStore.deleteAccount()
  if (status) {
    authStore.logout()
    router.push({ name: "index", query: { action: "delete-account" } })
  }
}
</script>
