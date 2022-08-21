<script setup lang="ts">
import { ref } from "vue";
//modules
import { useForm, useField } from "vee-validate";
// components
import InputAtom from "@/components/Atoms/InputAtom.vue";
// api
import AdminService from "@/http/adminApi";
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
// type
import type { ISetting } from "@/models/admin/ISetting";
const emit = defineEmits(["updateSettings"]);
// props
interface IProps {
  setting: ISetting;
}
const props = defineProps<IProps>();
// size
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greater("md");
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

settingName.value = props.setting.name;
settingValue.value = props.setting.value;

const onSubmit = handleSubmit(async () => {
  isRequest.value = true;
  if (!props.setting._id) {
    return;
  }
  await AdminService.updateSetting(props.setting._id, {
    name: settingName.value,
    value: settingValue.value,
  });
  isRequest.value = false;
  emit("updateSettings");
});

const deleteSetting = async (setting: ISetting) => {
  if (!setting._id) {
    return;
  }
  await AdminService.deleteSetting(setting._id);
  emit("updateSettings");
};
</script>

<template>
  <tr>
    <td>
      <InputAtom
        v-model="settingName"
        :title="!isDesktop ? 'Name' : ''"
        :error="settingNameError"
        :small="true"
      />
    </td>
    <td>
      <InputAtom
        v-model="settingValue"
        :title="!isDesktop ? 'Value' : ''"
        :error="settingValueError"
        :small="true"
      />
    </td>
    <td>
      <div class="flex md:justify-end">
        <button class="btn btn-sm btn-outline mr-2" @click="onSubmit">
          Save
        </button>
        <button class="btn btn-sm btn-outline" @click="deleteSetting(setting)">
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>
