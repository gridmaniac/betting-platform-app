<script setup lang="ts">
import AdminServiece from "@/http/adminApi";
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
  const response = await AdminServiece.getUsers();
  console.log(response.data);
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
              <th>email</th>
              <th>salt</th>
              <th>hash</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user.email }}</td>
              <td>{{ user.salt }}</td>
              <td>{{ user.hash }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>
