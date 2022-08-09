<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";
import { computed, ref, useSlots } from "vue";
// composables
import { usePagination } from "@/composables/pagination";
// types
import type { ITransaction } from "@/models/walletModels";
// props
interface IProps {
  rows: ITransaction[];
  cols: {
    name: string;
    value: string;
    classes: string;
  }[];
}
const props = defineProps<IProps>();
// vars
const slots = useSlots();
const size = 8;
const colName = ref("");
//
const totalRecords = ref(props.rows.length);
const { page, pages, setPage, totalPages } = usePagination({
  totalRecords,
  pageSize: size,
});

const setSort = (value: string) => {
  colName.value = value;
};

const paginateItems = computed(() => {
  const from = (page.value - 1) * size;
  const to = from + size;
  return props.rows.slice(from, to);
});
</script>

<template>
  <div class="flex flex-col w-full">
    <table class="table table-zebra table-compact w-full">
      <thead>
        <tr>
          <th
            v-for="col in cols"
            :key="col.value"
            :class="col.classes"
            @click="setSort(col.value)"
          >
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in paginateItems" :key="i">
          <template v-for="col in cols" :key="col.id">
            <td>
              <template v-if="slots[col.value] == null">
                {{ row[col.value] }}
              </template>
              <slot :item="row" :name="col.value" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div class="btn-group mt-6 mx-auto" v-if="pages.length > 1">
      <button class="btn" @click="setPage(page - 1)" v-if="page !== 1">
        <component :is="ChevronLeftIcon" class="w-4 h-4" />
      </button>
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
      <button class="btn" @click="setPage(page + 1)" v-if="page !== totalPages">
        <component :is="ChevronRightIcon" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
