<script setup lang="ts">
import AdminService from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TableAdmin from "@/components/Tables/TableAdmin/TableAdmin.vue";
import TheTitle from "@/components/TheTitle.vue";
// titles
import { TitleAdminSettings } from "@/composables/titlesState";
// types
import type { ISetting } from "@/models/admin/ISetting";
import LoadingAtom from "@/components/Atoms/LoadingAtom.vue";
import WrapperAtom from "@/components/Atoms/WrapperAtom.vue";
import SettingCreateForm from "@/components/Forms/SettingCreateForm.vue";
// vars
const settings = ref<ISetting[]>([]);
const isRequest = ref(false);
const isNewItem = ref(false);
onMounted(async () => {
  loadSettings();
});

async function loadSettings() {
  isNewItem.value = false;
  isRequest.value = true;
  const { data } = await AdminService.getSettings();
  settings.value = data.data;
  isRequest.value = false;
}
</script>

<template>
  <TheTitle :title="TitleAdminSettings">
    <template #control-right>
      <button
        class="btn btn-sm btn-outline"
        @click="isNewItem = true"
        :disabled="isNewItem"
      >
        New
      </button>
    </template>
  </TheTitle>
  <WrapperAtom v-if="isRequest" class="mt-6">
    <LoadingAtom />
  </WrapperAtom>
  <template v-else>
    <WrapperAtom v-if="isNewItem" class="mt-6">
      <SettingCreateForm
        @update-settings="loadSettings"
        @cancel-update="isNewItem = false"
      />
    </WrapperAtom>
    <WrapperAtom class="mt-6">
      <TableAdmin :settings="settings" @update-settings="loadSettings" />
    </WrapperAtom>
  </template>
</template>

<style scoped lang="scss">
.test {
  overflow: hidden;
}
</style>
