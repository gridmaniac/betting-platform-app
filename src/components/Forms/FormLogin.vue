<script setup lang="ts">
import { ref, onMounted } from "vue";
//src
import token from "@/assets/koa.png";
//modules
import { useForm, useField } from "vee-validate";
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
};

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");

const onSubmit = handleSubmit(async () => {
  isRequest.value = true;
  const response = await authStore.login(email.value, password.value);
  isRequest.value = false;
  const { modelErrors } = response;
  if (modelErrors) {
    errors.value = modelErrors;
    return;
  }
  modalStore.isModalAuthVisible = false;
});

const forgotPassword = () => {
  email.value = "";
  password.value = "";
  modalStore.isModalAuthVisible = false;
  modalStore.isModalResetPassword = true;
};
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
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Password</span>
        <span class="label-text-alt" @click="forgotPassword()"
          >Forgot password?</span
        >
      </label>
      <input
        type="password"
        class="input input-bordered w-full"
        v-model="password"
      />
      <label class="label">
        <span class="label-text-alt">
          {{ passwordError || errors["password"] }}
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
        Login
      </button>
      <button
        class="btn btn-ghost"
        @click="modalStore.isLogin = false"
        :disabled="isRequest"
      >
        create account
      </button>
    </div>
  </div>
</template>
