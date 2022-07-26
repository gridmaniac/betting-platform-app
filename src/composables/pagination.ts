import { computed, ref } from "vue";
import type { Ref, ComputedRef } from "vue";

export interface PaginationOptions {
  totalRecords: Ref<number>;
  pageSize: number;
}

export interface Page {
  n: number;
  break?: boolean;
}

export interface PaginationContext {
  total: ComputedRef<number>;
  totalPages: ComputedRef<number>;
  page: Ref<number>;
  pages: ComputedRef<Page[]>;
  setPage: (n: number) => void;
  paginate: (array: unknown[]) => unknown[];
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination(options: PaginationOptions): PaginationContext {
  const total = computed(() => options.totalRecords.value);

  const totalPages = computed(() => Math.ceil(total.value / options.pageSize));
  const page = ref(1);
  const pages = computed(() => {
    let list = [];

    if (totalPages.value < 10) {
      list = Array.from({ length: totalPages.value }, (v, n) => ({
        n: n + 1,
      }));
    } else {
      if (page.value !== 1)
        list.push({
          n: 1,
        });

      if (page.value - 3 > 1) {
        list.push({
          n: page.value - 3,
          break: true,
        });
      }

      if (page.value - 2 > 1) {
        list.push({
          n: page.value - 2,
        });
      }

      if (page.value - 1 > 1) {
        list.push({
          n: page.value - 1,
        });
      }

      list.push({
        n: page.value,
      });

      if (page.value + 1 < totalPages.value) {
        list.push({
          n: page.value + 1,
        });
      }

      if (page.value + 2 < totalPages.value) {
        list.push({
          n: page.value + 2,
        });
      }

      if (page.value + 3 < totalPages.value) {
        list.push({
          n: page.value + 3,
          break: true,
        });
      }

      if (page.value !== totalPages.value)
        list.push({
          n: totalPages.value,
        });
    }

    return list;
  });

  const setPage = (n: number) => {
    page.value = n;
  };

  const paginate = (array: unknown[]) => {
    if (array?.length <= options.pageSize) return array;

    return array?.slice(
      (page.value - 1) * options.pageSize,
      page.value * options.pageSize
    );
  };

  const nextPage = () => {
    if (page.value === totalPages.value) return;
    page.value++;
  };

  const prevPage = () => {
    if (page.value === 1) return;
    page.value--;
  };

  return {
    total,
    totalPages,
    page,
    pages,
    setPage,
    paginate,
    nextPage,
    prevPage,
  };
}
