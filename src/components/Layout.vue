<script setup>
import { ref, provide, computed } from "vue";
//modules
import { useForm, useField } from "vee-validate";
//src
import token from "../../src/assets/koa-token.png";
//component
import Drawer from "./Drawer.vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Modal from "./Modal.vue";
// http
import { signIn, registrarion } from "../http/userApi";

const errors = ref({});
const drawer = ref(false);
const isLogin = ref(true);
const isAuth = ref(localStorage.getItem("token"));
const isWallet = ref(localStorage.getItem("isWallet"));
const isModalAuthVisible = ref(false);
const myinput = ref(null)

const login = (token) => {
  localStorage.setItem("token", token);
  isAuth.value = true;
  console.log(isModalAuthVisible.value);
  isModalAuthVisible.value = false;
};

const logout = () => {
  localStorage.removeItem("token");
  isAuth.value = false;
};

provide("auth", {
  login,
  logout,
  isLogin,
  isAuth,
  isWallet,
  isModalAuthVisible,
});

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
  if (isLogin.value) {
    const response = await signIn(email.value, password.value);
    const { data, modelErrors } = response;
    if (modelErrors) {
      errors.value = modelErrors;
    }
    if (data) {
      login(data);
    }
    return;
  }
  const { data, modelErrors } = await registrarion(
    email.value,
    password.value,
    confirmPassword.value
  );
  if (modelErrors) {
    errors.value = modelErrors;
  }
});

const submitData = computed(() => {
  console.log(isModalAuthVisible);
  if (isModalAuthVisible) {
    myinput.value.focus()
  }
  return
})

const changeMode = () => {
  isLogin.value = !isLogin.value;
};

const closeModalAuth = () => {
  isModalAuthVisible.value = false;
};
</script>

<template>
  <Modal
    modalId="modalAuth"
    :checked="isModalAuthVisible"
    @closeModal="closeModalAuth"
  >
    <template #header>
      <img class="d-block m-auto w-40" :src="token" alt="koa-token" />
      <h2 class="font-bold text-2xl text-primary">
        <span v-if="!isLogin">New account</span>
        <span v-else>Welcome back</span>
      </h2>
    </template>
    <template #body>
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
      <div class="form-control w-full" v-if="!isLogin">
        <label class="label">
          <span class="label-text">Confirm password</span>
        </label>
        <input
          v-model="confirmPassword"
          type="password"
          class="input input-bordered w-full"
        />
        <label class="label">
          <span class="label-text-alt">
            {{ confirmPasswordError || errors["confirmPassword"] }}
          </span>
        </label>
      </div>
      <div class="flex justify-between mt-5">
        <button class="btn btn-warning" @click="onSubmit">
          <template v-if="isLogin">Login</template>
          <template v-else>Create account</template>
        </button>
        <button class="btn btn-ghost" @click="changeMode">
          <template v-if="isLogin">do not have account?</template>
          <template v-else>
            <span class="hidden sm:block">have an account already?</span>
            <span class="block sm:hidden">i have account</span>
          </template>
        </button>
      </div>
    </template>
  </Modal>
  <div class="bg-base-200 drawer drawer-mobile h-screen">
    <input
      id="my-drawer-2"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <main class="drawer-content overflow-x-hidden flex flex-col">
      <Header />
      <div class="flex-auto">
        <router-view class=""></router-view>
      </div>
      <Footer />
    </main>
    <Drawer @navigate="drawer = false" />
  </div>
</template>
