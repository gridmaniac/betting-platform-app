<script setup lang="ts">
import { ref, onMounted } from "vue";
//src
import token from "@/assets/koa-large.png";
//modules
import { useForm, useField } from "vee-validate";
// composables
import { RegisterSucces } from "@/composables/ModalNotifications";
//store
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
//authStore
const authStore = useAuthStore();
const modalStore = useModalStore();

const isRequest = ref(false);
const errors = ref<{ [key: string]: string }>({});
const emailInput = ref();
onMounted(() => {
  emailInput.value.focus();
});

const validationSchema = {
  email(value: string) {
    if (value === "" || value == null) {
      return "E-mail is required";
    }
    if (value != null && value.length >= 50) {
      return `Limit exceeded`;
    }
    return true;
  },
  password(value: string) {
    if (value === "" || value == null) {
      return "Password is required";
    }
    if (value != null && value.length >= 50) {
      return `Limit exceeded`;
    }
    return true;
  },
  confirmPassword(value: string) {
    if (value === "" || value == null) {
      return "Password is required";
    }
    if (value != null && value.length >= 50) {
      return `Limit exceeded`;
    }
    return true;
  },
};

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField<string>("confirmPassword");

const onSubmit = handleSubmit(async () => {
  isRequest.value = true;
  const { data, modelErrors } = await authStore.register(
    email.value,
    password.value,
    confirmPassword.value
  );
  isRequest.value = false;
  if (modelErrors) {
    errors.value = modelErrors;
    return;
  }
  if (data) {
    modalStore.isModalAuthVisible = false;
    modalStore.modalNotificationContent = RegisterSucces;
    modalStore.isModalNotification = true;
  }
});
</script>

<template>
  <div>
    <img class="d-block m-auto w-40" :src="token" alt="koa-token" />
    <div>
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
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          class="input input-bordered w-full"
          v-model="password"
          autocomplete="new-password"
        />
        <label class="label">
          <span class="label-text-alt">
            {{ passwordError || errors["password"] }}
          </span>
        </label>
      </div>
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Confirm password</span>
        </label>
        <input
          v-model="confirmPassword"
          type="password"
          class="input input-bordered w-full"
          autocomplete="new-password"
        />
        <label class="label">
          <span class="label-text-alt">
            {{ confirmPasswordError || errors["confirmPassword"] }}
          </span>
        </label>
      </div>
    </div>
    <div class="divider"></div>
    <div class="flex justify-between">
      <button
        class="btn btn-outline"
        @click="onSubmit"
        :class="{ loading: isRequest }"
        :disabled="isRequest"
      >
        Create account
      </button>
      <button
        class="btn btn-ghost"
        @click="modalStore.isLogin = true"
        :disabled="isRequest"
      >
        login
      </button>
    </div>
  </div>
</template>
