<script setup lang="ts">
import AdminService from "@/http/adminApi";
import { onMounted, ref } from "vue";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminUsers } from "@/composables/titlesState";
// types
import type { IUser } from "@/models/admin/IUser";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";

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
  <div>
    <TheTitle :title="TitleAdminUsers" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <LoadingAtom v-if="isRequest" />
      <template v-else>
        <table class="table table-compact table-zebra w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user._id }}</td>
              <td>{{ user.email }}</td>
              <td>
                {{ user.address }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
