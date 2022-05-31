<script setup>
import { ref, inject } from "vue";
//src
import token from "../../../src/assets/koa-token.png";
//modules
import { useForm, useField } from "vee-validate";
// http
import { signIn, registrarion } from "../../http/userApi";

const { isLogin, login } = inject("auth");

const myinput = ref(null);
const errors = ref({});
const isAcceptRegiser = ref(false);

const validationSchema = {
  email(value) {
    if (value === "" || value == null) {
      return "E-mail is required";
    }
    return true;
  },
  password(value) {
    if (value === "" || value == null) {
      return "Password is required";
    }
    return true;
  },
  confirmPassword(value) {
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
  const response = await signIn(email.value, password.value);
  const { data, modelErrors } = response;
  if (modelErrors) {
    errors.value = modelErrors;
  }
  if (data) {
    login(data);
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
        ref="myinput"
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
