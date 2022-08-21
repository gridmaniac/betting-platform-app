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

const isRequest = ref(false);

const errors = ref<{ [key: string]: string }>({});
const validationSchema = {
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
      return "Confirm password is required";
    }
    if (value != null && value.length >= 50) {
      return `Limit exceeded`;
    }
    return true;
  },
};

const { handleSubmit, resetForm } = useForm({
  validationSchema,
});

const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField("confirmPassword");

const onSubmit = handleSubmit(async () => {
  if (password.value !== confirmPassword.value) {
    errors.value = {
      confirmPassword: "Passwords do not match.",
    };
    return;
  }
  isRequest.value = true;
  const { modelErrors, data } = await authStore.changePassword(password.value);
  isRequest.value = false;
  if (modelErrors) {
    errors.value = modelErrors;
  }
  if (data) {
    errors.value = {};
    toastStore.push(ToastPasswordChange);
    resetForm();
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
        <label class="label" v-if="passwordError || errors['password']">
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
        <label
          class="label"
          v-if="confirmPasswordError || errors['confirmPassword']"
        >
          <span class="label-text-alt">
            {{ confirmPasswordError || errors["confirmPassword"] }}
          </span>
        </label>
      </div>
    </div>
    <div class="flex justify-between mt-5">
      <button
        class="btn btn-outline"
        :class="{ loading: isRequest }"
        :disabled="isRequest"
        @click="onSubmit"
      >
        Change password
      </button>
    </div>
  </div>
</template>
