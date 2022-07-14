<script setup lang="ts">
import { ref } from "vue";
// composables
import { ToastPasswordChange } from "@/composables/toastNotification";
// modules
import { useForm, useField } from "vee-validate";
// store
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
const authStore = useAuthStore();
const toastStore = useToastStore();

const errors = ref<{ [key: string]: string }>({});
const validationSchema = {
  password(value: string) {
    if (value === "" || value == null) {
      return "Password is required";
    }
    return true;
  },
  confirmPassword(value: string) {
    if (value === "" || value == null) {
      return "Confirm password is required";
    }
    return true;
  },
};

const { handleSubmit, resetForm } = useForm({
  validationSchema,
});

const { value: password, errorMessage: passwordError } = useField("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");

const onSubmit = handleSubmit(async () => {
  if (password.value !== confirmPassword.value) {
    errors.value = {
      confirmPassword: "Passwords do not match.", // ASK
    };
    return;
  }
  const { modelErrors, data } = await authStore.changePassword(
    password.value as string
  );
  if (modelErrors) {
    errors.value = modelErrors;
  }
  if (data) {
    toastStore.push(ToastPasswordChange);
    resetForm();
    // errors.value = {};
  }
});
</script>

<template>
  <div>
    <div class="w-full max-w-xs">
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
    <div class="flex justify-between mt-5">
      <button class="btn btn-outline" @click="onSubmit">Change password</button>
    </div>
  </div>
</template>