<script setup lang="ts">
import AdminService from "@/http/adminApi";
import { onMounted, ref } from "vue";
import moment from "moment";
// components
import TheTitle from "@/components/TheTitle.vue";
// title
import { TitleAdminBets } from "@/composables/titlesState";
// types
import type { IBet } from "@/models/Bet";
import LoadingAtom from "../../components/Atoms/LoadingAtom.vue";

// vars
const bets = ref<IBet[]>([]);
const isRequest = ref(false);
onMounted(async () => {
  isRequest.value = true;
  const { data } = await AdminService.getBets();
  bets.value = data.data;
  isRequest.value = false;
});
</script>

<template>
  <div>
    <TheTitle :title="TitleAdminBets" />
    <div class="card shadow-lg compact side bg-base-100 p-3 mt-6">
      <LoadingAtom v-if="isRequest" />
      <template v-else>
        <table class="table table-compact table-zebra">
          <thead>
            <tr>
              <th>sport</th>
              <th>season</th>
              <th>event id</th>
              <!-- <th>start time</th> -->
              <th>amount</th>
              <th>date</th>
              <th>status</th>
              <th>type</th>
              <th>userId</th>
              <th>winner</th>
              <th>winner id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bet in bets" :key="bet._id">
              <td>{{ bet.sport }}</td>
              <td>{{ bet.season }}</td>
              <td>{{ bet.eventId }}</td>
              <!-- <td>{{ moment(bet.startTime).format("HH:mm:ss") }} <br> {{ moment(bet.startTime).format("DD/MM/YYYY") }}</td> -->
              <td>{{ bet.amount / 1000000000 }}</td>
              <td>
                {{ moment(bet.date).format("HH:mm:ss") }} <br />
                {{ moment(bet.date).format("DD/MM/YYYY") }}
              </td>
              <td>{{ bet.status }}</td>
              <td>{{ bet.type }}</td>
              <td>
                <div class="test">{{ bet.userId }}</div>
              </td>
              <td>{{ bet.winner }}</td>
              <td>{{ bet.winnerId }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  white-space: nowrap;
  width: 100%;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
