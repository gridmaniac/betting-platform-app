<script setup lang="ts">
import { ref } from "vue";
// api
import AdminService from "@/http/adminApi";
// components
import InputAtom from "@/components/Atoms/InputAtom.vue";
import SelectAtom from "@/components/Atoms/SelectAtom.vue";
// types
import type { IAsset } from "@/models/admin/IAsset";
import type { IToast } from "@/models/notificationModel";
// store
import { useToastStore } from "@/stores/toastStore";
const toastStore = useToastStore();
//emit
const emit = defineEmits(["assetCreated"]);
// vars
const isRequest = ref(false);
const asset = ref<IAsset>({
  code: "",
  contract: "",
  contractABI: "",
  decimals: 0,
  listed: false,
  minStake: "",
  minWithdrawal: "",
  type: "",
  ethTax: "0",
});
const listedOptions = [
  {
    value: true,
    name: "true",
  },
  {
    value: false,
    name: "false",
  },
];
// func
const save = async (asset: IAsset) => {
  isRequest.value = true;
  const response = await AdminService.createAsset(asset);
  if (response.data.data) {
    emit("assetCreated", asset);
    return;
  }
  if (response.data.err) {
    const errors = response.data.err.split("Asset validation failed: ");
    const errorArray = errors[1].split(", ");
    errorArray.forEach((item) => {
      const textError = item.split(":");
      const toast: IToast = {
        id: 0,
        title: "Error",
        description: textError[1],
        status: "error",
      };
      toastStore.push(toast);
    });
    isRequest.value = false;
  }
};
</script>

<template>
  <div v-if="asset" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
    <InputAtom title="Code" v-model="asset.code" />
    <InputAtom title="Decimals" v-model="asset.decimals" />
    <SelectAtom
      title="Listed"
      :options="listedOptions"
      :placeholder="{ value: 0, name: 'pick type' }"
      v-model="asset.listed"
    />
    <InputAtom title="Min stake" v-model="asset.minStake" />
    <InputAtom title="Min withdrawal" v-model="asset.minWithdrawal" />
    <InputAtom title="Type" v-model="asset.type" />
    <InputAtom title="Contract" v-model="asset.contract" />
    <InputAtom title="Contract ABI" v-model="asset.contractABI" />
    <div>
      <button
        class="btn btn-outline mt-6"
        @click="save(asset)"
        :disabled="isRequest"
      >
        add token
      </button>
    </div>
  </div>
</template>
