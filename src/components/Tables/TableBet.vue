<script setup lang="ts">
import { computed } from "vue";
//
import token from "@/assets/koa-token.png";
import moment from "moment";
// composables
import { balanceFormat } from "@/composables/functions";
import { usePagination } from "@/composables/pagination";
// type
import type { IBet } from "@/models/Bet";
// props
interface IProps {
  rows: IBet[];
}
const props = defineProps<IProps>();
// vars
const cols = [
  {
    name: "event",
    value: "event",
    classes: "",
  },
  {
    name: "amount",
    value: "amount",
    classes: "text-center",
  },
  {
    name: "status",
    value: "status",
    classes: "text-center text-center",
  },
];
//
// const paginateItems = computed(() => {
//   const from = (page.value - 1) * size;
//   const to = from + size;
//   return props.rows.slice(from, to);
// });

const totalRecords = computed(() => props.rows.length);
const size = 4;
//
const { page, pages, setPage, paginate } = usePagination<IBet>({
  totalRecords,
  pageSize: size,
});
</script>

<template>
  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th v-for="col in cols" :key="col.value" :class="col.classes">
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="bet in paginate(rows)" :key="bet._id">
        <td data-name="Event: ">
          <div class="whitespace-normal">
            <strong>{{ bet.season }}</strong>
            <p>{{ moment(bet.startTime).format("MMMM DD, YYYY") }}</p>
            <p class="text-primary">Winner: {{ bet.winner }}</p>
          </div>
        </td>
        <td class="text-center" data-name="amount: ">
          <span>
            <img class="inline-block mr-1 h-4" :src="token" />
            {{ balanceFormat(bet.amount) }}
          </span>
        </td>
        <td class="text-center" data-name="status:">
          <div
            class="badge badge-primary capitalize"
            :class="{
              'badge-accent': bet.status === 'cancelled',
              'badge-success': bet.status === 'settled',
            }"
          >
            {{ bet.status }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="btn-group mt-6 mx-auto" v-if="pages.length > 1">
    <template v-for="(tablePage, index) in pages" :key="tablePage.n">
      <template v-if="tablePage.break">
        <template v-if="pages[index - 1].n !== pages[index].n - 1">
          <button class="btn">...</button>
        </template>
      </template>
      <button
        class="btn"
        :class="{ 'btn-active': tablePage.n === page }"
        @click="setPage(tablePage.n)"
      >
        {{ tablePage.n }}
      </button>
      <template v-if="tablePage.break">
        <template v-if="pages[index + 1].n !== pages[index].n + 1">
          <button class="btn">...</button>
        </template>
      </template>
    </template>
  </div>
</template>
