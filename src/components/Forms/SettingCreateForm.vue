<script setup lang="ts">
import { ref } from "vue";
// components
import InputAtom from "@/components/Atoms/InputAtom.vue";
// api
import AdminService from "@/http/adminApi";
//modules
import { useForm, useField } from "vee-validate";
const emit = defineEmits(["updateSettings", "cancelUpdate"]);
// vars
const isRequest = ref(false);

const validationSchema = {
  settingName(value: string) {
    if (value === "" || value == null) {
      return "Field is required";
    }
    return true;
  },
  settingValue(value: string) {
    if (value === "" || value == null) {
      return "Field is required";
    }
    return true;
  },
};

const { handleSubmit } = useForm({ validationSchema });

const { value: settingName, errorMessage: settingNameError } =
  useField<string>("settingName");
const { value: settingValue, errorMessage: settingValueError } =
  useField<string>("settingValue");

const onSubmit = handleSubmit(async () => {
  isRequest.value = true;
  await AdminService.createSetting({
    name: settingName.value,
    value: settingValue.value,
  });
  isRequest.value = false;
  emit("updateSettings");
});

const cancel = () => {
  emit("cancelUpdate");
};
</script>

<template>
  <div>
    <InputAtom v-model="settingName" title="Name" :error="settingNameError" />
    <InputAtom
      v-model="settingValue"
      title="Value"
      :error="settingValueError"
    />
    <button class="btn btn-outline mt-8 mr-2" @click="onSubmit">Create</button>
    <button class="btn btn-outline mt-8" @click="cancel">Cancel</button>
  </div>
</template>
