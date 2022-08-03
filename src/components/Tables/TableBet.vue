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

const totalRecords = computed(() => props.rows.length);
const size = 8;
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
          <div class="badge badge-primary capitalize" :class="{
            'badge-accent': bet.status === 'cancelled',
            'badge-success': bet.status === 'settled',
          }">
            {{ bet.status }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="rows.length === 0" class="h-20 flex items-center ">
    <p>No bets</p>
  </div>
  <div class="btn-group mt-6 mx-auto" v-if="pages.length > 1">
    <template v-for="(tablePage, index) in pages" :key="tablePage.n">
      <template v-if="tablePage.break">
        <template v-if="pages[index - 1].n !== pages[index].n - 1">
          <button class="btn">...</button>
        </template>
      </template>
      <button class="btn" :class="{ 'btn-active': tablePage.n === page }" @click="setPage(tablePage.n)">
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

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  table {
    thead {
      display: none;
    }

    tbody {
      tr {
        display: flex;
        flex-direction: column;

        td {
          display: flex;
          justify-content: space-between;

          &::before {
            content: attr(data-name);
            text-transform: capitalize;
          }

          &:first-child {
            justify-content: flex-start;
            text-align: start;

            div {
              width: 100%;
            }

            &::before {
              content: none;
            }
          }

          &:nth-child(2) {
            padding-top: 0;
          }

          &:nth-child(3) {
            padding-top: 0;
          }
        }
      }
    }
  }
}
</style>