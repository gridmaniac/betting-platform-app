<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
//src
import token from "../../../src/assets/koa-token.png";
//modules
import { useForm, useField } from "vee-validate";
// http
import { fetchUser } from "../../http/userApi";
//store
import { useAuthStore } from "@/stores/authStore";
//authStore
const authStore = useAuthStore();

const { isLogin, isModalAuthVisible } = inject<any>("auth");

const emailInput = ref();
onMounted(() => {
  emailInput.value.focus();
});

const errors = ref<any>({});

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
};

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit(async () => {
  const response = await fetchUser(email.value as string, password.value as string);
  const { data, modelErrors } = response;
  if (modelErrors) {
    errors.value = modelErrors;
  }
  if (data) {
    authStore.login(data);
    isModalAuthVisible.value = false;
  }
  return;
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
    <div class="form-control w-full">
      <label class="label">
        <span class="label-text">Password</span>
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
      <button class="btn btn-outline" @click="onSubmit">Login</button>
      <button class="btn btn-ghost" @click="isLogin = false">
        create account
      </button>
    </div>
  </div>
</template>
