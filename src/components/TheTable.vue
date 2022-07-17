<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import type { ITransaction } from "@/models/walletModels";

interface IProps {
  rows: ITransaction[];
  cols: {
    name: string;
    value: string;
    classes: string;
  }[];
}

const props = defineProps<IProps>();
const slots = useSlots();

const currentPage = ref(1);
const size = 8;

const colName = ref("");
const setSort = (value: string) => {
  colName.value = value;
};

const pages = computed(() => {
  return Math.ceil(props.rows.length / size);
});

const paginateItems = computed(() => {
  const from = (currentPage.value - 1) * size;
  const to = from + size;
  return props.rows.slice(from, to);
});

const setPage = (pageNumber: number) => {
  currentPage.value = pageNumber;
};
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
    <div class="btn-group mt-6 mx-auto" v-if="pages > 1">
      <button
        class="btn"
        v-for="i in pages"
        :key="i"
        :class="{ 'btn-active': i === currentPage }"
        @click="setPage(i)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>
