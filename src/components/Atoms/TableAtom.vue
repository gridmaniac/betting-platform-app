<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/outline";
import { computed, ref, useSlots } from "vue";
// composables
import { usePagination } from "@/composables/pagination";
import InputAtom from "./InputAtom.vue";
interface ICol {
  name: string;
  value: string;
  classes?: string;
}
interface IRow {
  [key: string]: string | number | boolean;
}
// props
interface IProps {
  rows: IRow[];
  cols: ICol[];
  size: number;
  notFound: string;
}
const props = defineProps<IProps>();
// vars
const slots = useSlots();
const colName = ref("");
const filter = ref("");
const setSort = (value: string) => {
  colName.value = value;
};

const filtredRows = computed(() => {
  return props.rows.filter((x) => {
    for (const key in x) {
      if (props.cols.find((x) => x.value === key)) {
        const result = x[key].toString().includes(filter.value);
        if (result) return x;
      }
    }
  });
});
const totalRecords = computed(() => {
  return filtredRows.value.length;
});
const { page, pages, setPage, totalPages } = usePagination({
  totalRecords,
  pageSize: props.size,
});

const paginateItems = computed(() => {
  const from = (page.value - 1) * props.size;
  const to = from + props.size;
  return filtredRows.value.slice(from, to);
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="mb-6">
      <InputAtom v-model="filter" placeholder="Search..." :small="true" />
    </div>
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
      <tbody v-if="paginateItems.length">
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
    <div
      v-if="!paginateItems.length"
      class="h-32 flex justify-center items-center w-full"
    >
      {{ notFound }}
    </div>
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
