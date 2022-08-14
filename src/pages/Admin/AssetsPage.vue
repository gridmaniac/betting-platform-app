<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminAssets } from "@/composables/titlesState";
// types
import type { IAsset } from "@/models/admin/IAsset";
import InputAtom from "@/components/Atoms/InputAtom.vue";
// vars
const assets = ref<IAsset[]>([]);
const selectedAsset = ref<IAsset>();
const code = ref("");
const contrac = ref("");
const contracAbi = ref("");
const decimals = ref<number>();
const listed = ref<boolean>();
const minStake = ref("");
const minWithdrawal = ref("");
const type = ref("");

onMounted(async () => {
  const assetsResponse = await AdminServiece.getAssets();
  assets.value = assetsResponse.data.data;
});

function chooseAsset(asset: IAsset) {
  selectedAsset.value = asset;
  code.value = asset.code;
  contrac.value = asset.contract;
  contracAbi.value = asset.contractABI;
  decimals.value = asset.decimals;
  listed.value = asset.listed;
  minStake.value = asset.minStake;
  minWithdrawal.value = asset.minWithdrawal;
  type.value = asset.type;
}

const save = async (asset: IAsset) => {
  console.log(asset);
} 
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminAssets" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <ul class="menu bg-base-100 rounded-box w-full">
        <li class="menu-title">
          <span>tokens</span>
        </li>
        <li
          v-for="asset in assets"
          :key="asset._id"
          @click="chooseAsset(asset)"
        >
          <a
            :class="{
              active: selectedAsset && asset._id === selectedAsset._id,
            }"
            >{{ asset.code }}</a
          >
        </li>
      </ul>
    </div>

    <div
      class="card shadow-lg compact side bg-base-100 p-3 mt-6"
      v-if="selectedAsset"
    >
      <div>
        <InputAtom title="Code" v-model="code" />
        <InputAtom title="Decimals" v-model="decimals" />
        <InputAtom title="Listed" v-model="listed" />
        <InputAtom title="Min stake" v-model="minStake" />
        <InputAtom title="Min withdrawal:" v-model="minWithdrawal" />
        <InputAtom title="Type:" v-model="type" />
        <InputAtom title="Contract" v-model="contrac" />
        <InputAtom title="Contract ABI:" v-model="contracAbi" />
        <button class="btn btn-outline mt-6" @click="save(selectedAsset)">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  overflow: hidden;
}
</style>
