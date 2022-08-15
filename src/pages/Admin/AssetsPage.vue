<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
import FormNewAsset from "@/components/Forms/FormNewAsset.vue";
import InputAtom from "@/components/Atoms/InputAtom.vue";
import SelectAtom from "@/components/Atoms/SelectAtom.vue";
// title
import { TitleAdminAssets } from "@/composables/titlesState";
// types
import type { IAssetResponse } from "@/models/admin/IAsset";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";
// vars
const assets = ref<IAssetResponse[]>([]);
const isEdit = ref(false);
const isRequest = ref(false);
onMounted(async () => {
  fetchAssets();
});
// edit
const currentAsset = ref<IAssetResponse | null>();
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
// tab logic
const tabs = ["Current tokens", "New token"];
const activeTab = ref();
activeTab.value = "Current tokens";
const chooseTab = (tab: string) => {
  if (!isEdit.value) {
    activeTab.value = tab;
  }
};
// func
const edit = (asset: IAssetResponse) => {
  const candidate = JSON.stringify(asset);
  currentAsset.value = JSON.parse(candidate);
  isEdit.value = true;
};

const save = async () => {
  fetchAssets();
  currentAsset.value = null;
  isEdit.value = false;
};

const updateAssets = () => {
  activeTab.value = "Current tokens";
  fetchAssets();
};

async function fetchAssets() {
  isRequest.value = true;
  const assetsResponse = await AdminServiece.getAssets();
  assets.value = assetsResponse.data.data;
  isRequest.value = false;
}
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminAssets" />
    <div
      v-if="isRequest"
      class="card shadow-lg compact side bg-base-100 p-3 mt-6"
    >
      <LoadingAtom />
    </div>
    <template v-else>
      <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
        <div class="flex justify-center">
          <div class="tabs tabs-boxed">
            <a
              v-for="tab in tabs"
              :key="tab"
              class="tab"
              :class="{ 'tab-active': activeTab === tab }"
              @click="chooseTab(tab)"
              >{{ tab }}</a
            >
          </div>
        </div>
        <table
          v-if="activeTab === 'Current tokens'"
          class="table table-zebra table-compact w-full mt-6"
        >
          <thead>
            <tr>
              <th>code</th>
              <th>min stake</th>
              <th>min withdrawal</th>
              <th>contract</th>
              <th>control</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asset in assets" :key="asset._id">
              <td>{{ asset.code }}</td>
              <td>{{ asset.minStake }}</td>
              <td>{{ asset.minWithdrawal }}</td>
              <td class="test">{{ asset.contract }}</td>
              <td class="text-right">
                <button
                  class="btn btn-sm btn-outline"
                  @click="edit(asset)"
                  :disabled="isEdit"
                >
                  edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-if="activeTab === 'New token'"
        class="card shadow-lg compact side bg-base-100 p-3 mt-6"
      >
        <FormNewAsset @asset-created="updateAssets" />
      </div>
      <div
        v-if="currentAsset"
        class="card shadow-lg compact side bg-base-100 p-3 mt-6"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <InputAtom title="Code" v-model="currentAsset.code" />
          <InputAtom title="Decimals" v-model="currentAsset.decimals" />
          <SelectAtom
            title="Listed"
            :options="listedOptions"
            :placeholder="{ value: 0, name: 'pick type' }"
            v-model="currentAsset.listed"
          />
          <InputAtom title="Min stake" v-model="currentAsset.minStake" />
          <InputAtom
            title="Min withdrawal"
            v-model="currentAsset.minWithdrawal"
          />
          <InputAtom title="Type" v-model="currentAsset.type" />
          <InputAtom title="Contract" v-model="currentAsset.contract" />
          <InputAtom title="Contract ABI" v-model="currentAsset.contractABI" />
          <div>
            <button
              class="btn btn-outline mt-6"
              @click="currentAsset ? save() : ''"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
