<script setup lang="ts">
import { ref } from "vue";
// api
import AdminServiece from "@/http/adminApi";
// components
import InputAtom from "@/components/Atoms/InputAtom.vue";
import SelectAtom from "@/components/Atoms/SelectAtom.vue";
// types
import type { IAsset } from "@/models/admin/IAsset";
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
  console.log(asset);

  // axios
  const response = await AdminServiece.createAsset(asset);
  console.log(response.data);

  isRequest.value = false;
  emit("assetCreated", asset);
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
        Save
      </button>
    </div>
  </div>
</template>
