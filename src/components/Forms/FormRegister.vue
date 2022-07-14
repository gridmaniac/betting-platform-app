<script setup lang="ts">
import { ref, onMounted } from "vue";
//src
import token from "@/assets/koa-token.png";
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

const errors = ref<{ [key: string]: string }>({});
({});
const emailInput = ref();
onMounted(() => {
  emailInput.value.focus();
});

const validationSchema = {
  email(value: string) {
    if (value === "" || value == null) {
      return "E-mail is required";
    }
    return true;
  },
  password(value: string) {
    if (value === "" || value == null) {
      return "Password is required";
    }
    return true;
  },
  confirmPassword(value: string) {
    if (value === "" || value == null) {
      return "Password is required";
    }
    return true;
  },
};

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");

const onSubmit = handleSubmit(async () => {
  const { data, modelErrors } = await authStore.register(
    email.value as string,
    password.value as string,
    confirmPassword.value as string
  );
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
          autocomplete="off"
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
      <button class="btn btn-outline" @click="onSubmit">Create account</button>
      <button class="btn btn-ghost" @click="modalStore.isLogin = true">
        login
      </button>
    </div>
  </div>
</template>
