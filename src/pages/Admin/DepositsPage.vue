<script setup lang="ts">
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
import InputAtom from "../../components/Atoms/InputAtom.vue";
import SelectAtom from "../../components/Atoms/SelectAtom.vue";
// composables
import { TitleAdminDeposits } from "@/composables/titlesState";
// api
import AdminServiece from "@/http/adminApi";
// store
import { useToastStore } from "@/stores/toastStore";
import type { IToast } from "@/models/notificationModel";
const toastStore = useToastStore();
interface IOption {
  value: string;
  name: string;
}
// vars
const placeholder = {
  name: "choose asset",
  value: 0,
};
const block = ref("");
const lastBlock = ref("");
const code = ref("0");
const options = ref<IOption[]>([]);
// mounted
onMounted(async () => {
  const response = await AdminServiece.getAssets();
  console.log();
  const codeList: IOption[] = [];
  response.data.data.forEach((element) => {
    const option: IOption = {
      value: element.code,
      name: element.code,
    };
    codeList.push(option);
  });
  options.value = codeList;
});
// functions
const check = async () => {
  const { data } = await AdminServiece.checkDeposit({
    lastBlockNumber: lastBlock.value,
    blockNumber: block.value,
    code: code.value,
  });
  if (data.data) {
    const toast: IToast = {
      id: 0,
      title: "",
      description: "Success",
      status: "success",
    };
    return toastStore.push(toast);
  }
  const toast: IToast = {
    id: 0,
    title: "",
    description: "Error",
    status: "error",
  };
  return toastStore.push(toast);
};
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminDeposits" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <InputAtom v-model="lastBlock" title="Last block number" />
      <InputAtom v-model="block" title="Block number" />
      <SelectAtom
        v-model="code"
        title="code"
        :options="options"
        :placeholder="placeholder"
      />
      <div>
        <button class="btn btn-outline mt-5" @click="check">start</button>
      </div>
    </div>
  </div>
</template>
