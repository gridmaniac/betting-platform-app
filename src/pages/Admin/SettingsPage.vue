<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TableAdmin from "@/components/Tables/TableAdmin/TableAdmin.vue";
import TheTitle from "@/components/TheTitle.vue";
// titles
import { TitleAdminSettings } from "@/composables/titlesState";
// types
import type { ISetting } from "@/models/admin/ISetting";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";
// vars
const settings = ref<ISetting[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const settingsResponse = await AdminServiece.getSettings();
  settings.value = settingsResponse.data.data;
  isRequest.value = false;
});

const updateSettings = (newSettings: ISetting[]) => {
  settings.value = newSettings;
};
</script>

<template>
  <TheTitle :title="TitleAdminSettings" />
  <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
    <LoadingAtom v-if="isRequest" />
    <TableAdmin v-else :settings="settings" @update-settings="updateSettings" />
  </div>
</template>

<style scoped lang="scss">
.test {
  overflow: hidden;
}
</style>
