<script setup>
import { ref, inject } from "vue";
//src
import token from "../../../src/assets/koa-token.png";
//modules
import { useForm, useField } from "vee-validate";
// http
import { registrarion } from "../../http/userApi";

const { isLogin, isModalAuthVisible, isModalRegSuccessVisible, emailSucces } =
  inject("auth");

const myinput = ref(null);
const errors = ref({});

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
  const { data, modelErrors } = await registrarion(
    email.value,
    password.value,
    confirmPassword.value
  );
  if (data) {
    emailSucces.value = email.value;
    isModalAuthVisible.value = false;
    isModalRegSuccessVisible.value = true;
    return;
  }
  if (modelErrors) {
    errors.value = modelErrors;
  }

  email.value = "";
  password.value = "";
  confirmPassword.value = "";
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
          autocomplete="new-password"
        />
        <label class="label">
          <span class="label-text-alt">
            {{ passwordError || errors["password"] }}
          </span>
        </label>
      </div>
      <div class="form-control w-full" v-if="!isLogin">
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
      <button class="btn btn-ghost" @click="isLogin = true">login</button>
    </div>
  </div>
</template>
