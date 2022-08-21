<script setup lang="ts">
import { onMounted, ref } from "vue";
// api
import AdminService from "@/http/adminApi";
// components
import TheTitle from "@/components/TheTitle.vue";
import WrapperAtom from "@/components/Atoms/WrapperAtom.vue";
import TableAtom from "@/components/Atoms/TableAtom.vue";
import LoadingAtom from "@/components/Atoms/LoadingAtom.vue";
// composables
import { TitleAdminUsers } from "@/composables/titlesState";
import { cols } from "@/composables/adminUsers";
// types
import type { IUser } from "@/models/admin/IUser";

// vars
const users = ref<IUser[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const response = await AdminService.getUsers();
  users.value = response.data.data;
  isRequest.value = false;
});
</script>

<template>
  <TheTitle :title="TitleAdminUsers" />
  <WrapperAtom class="mt-6">
    <LoadingAtom v-if="isRequest" />
    <TableAtom
      v-else
      :cols="cols"
      :rows="users"
      :size="12"
      not-found="no users"
    />
  </WrapperAtom>
</template>
