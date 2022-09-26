<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
//
import { ethers } from "ethers";
import { useWalletStore } from "@/stores/walletStore";
import koa from "@/assets/koa.png";
import moment from "moment";
// composables
import { balanceEthFormat, balanceTokenFormat } from "@/composables/functions";
import { usePagination } from "@/composables/pagination";
// type
import type { IBet } from "@/models/Bet";
// props
interface IProps {
  rows: IBet[];
}

const walletStore = useWalletStore();
const { assets } = storeToRefs(walletStore);
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
    classes: "",
  },
  {
    name: "return",
    value: "profit",
    classes: "",
  },
  {
    name: "status",
    value: "status",
    classes: "text-center",
  },
];

const totalRecords = computed(() => props.rows.length);
const size = 8;
//
const { page, pages, setPage, paginate } = usePagination<IBet>({
  totalRecords,
  pageSize: size,
});

const items = computed(() =>
  props.rows.map((bet) => {
    const asset = assets.value.find((x) => x.code === bet.code);
    return {
      ...bet,
      amount: ethers.utils.formatUnits(bet.amount, asset?.decimals),
      profit: ethers.utils.formatUnits(bet.profit, asset?.decimals),
    };
  })
);
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
      <tr v-for="bet in paginate(items)" :key="bet._id">
        <td data-name="Event: ">
          <div class="whitespace-normal">
            <strong>{{ bet.season }}</strong>
            <p>{{ moment(bet.startTime).format("MMMM DD, YYYY") }}</p>
            <p class="text-primary">Pick: {{ bet.winner }}</p>
          </div>
        </td>
        <td class="text-center" data-name="amount:">
          <span class="flex items-center">
            <img class="inline-block mr-2 h-4" :src="koa" />
            {{
              bet.code === "eth"
                ? balanceEthFormat(bet.amount)
                : balanceTokenFormat(bet.amount)
            }}
          </span>
        </td>
        <td class="text-center" data-name="return:">
          <span class="flex items-center">
            <template v-if="bet.status === 'settled'">
              <div
                v-if="bet.profit != '0.0'"
                class="badge badge-warning gap-2 font-bold"
              >
                <img class="inline-block h-4" :src="koa" />
                {{
                  bet.code === "eth"
                    ? balanceEthFormat(bet.profit)
                    : balanceTokenFormat(bet.profit)
                }}
              </div>
              <div v-else class="badge badge-outline">No Return</div>
            </template>
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
  <div v-if="rows.length === 0" class="h-20 flex items-center">
    <p class="text-white">
      No bets.
      <RouterLink
        :to="{ name: 'mma' }"
        class="link-hover"
        style="color: #f8cb48"
        >Place</RouterLink
      >
      your first bet now!
    </p>
  </div>
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
