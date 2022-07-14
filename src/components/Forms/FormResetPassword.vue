<script setup lang="ts">
import { ref, onMounted } from "vue";
//src
import token from "@/assets/koa-token.png";
//modules
import { useForm, useField } from "vee-validate";
// composables
import { ResetPassword } from "@/composables/ModalNotifications";
//store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
//authStore
const authStore = useAuthStore();
const modalStore = useModalStore();

const isRequest = ref(false);

const emailInput = ref();
onMounted(() => {
  emailInput.value.focus();
});

const errors = ref<{ [key: string]: string }>({});
({});

const validationSchema = {
  email(value: string) {
    if (value === "" || value == null) {
      return "E-mail is required";
    }
    return true;
  },
};

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField("email");

const onSubmit = handleSubmit(async () => {
  isRequest.value = true;
  const { data } = await authStore.resetPassword(email.value as string);
  isRequest.value = false;
  if (data) {
    modalStore.isModalResetPassword = false;
    modalStore.modalNotificationContent = ResetPassword;
    modalStore.isModalNotification = true;
  }
});
</script>

<template>
  <div>
    <img class="d-block m-auto w-40" :src="token" alt="koa-token" />
    <div class="divider"></div>
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        class="input input-bordered w-full"
        required
        v-model="email"
        ref="emailInput"
      />
      <label class="label">
        <span class="label-text-alt">
          {{ emailError || errors["email"] }}
        </span>
      </label>
    </div>
    <div class="divider"></div>
    <div class="flex justify-between mt-5">
      <button
        class="btn btn-outline"
        @click="onSubmit"
        :class="{ loading: isRequest }"
        :disabled="isRequest"
      >
        Reset password
      </button>
      <button
        class="btn btn-ghost"
        :disabled="isRequest"
        @click="
          (modalStore.isModalResetPassword = false),
            (modalStore.isModalAuthVisible = true)
        "
      >
        Back to login
      </button>
    </div>
  </div>
</template>
