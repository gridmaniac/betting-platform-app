<script setup>
import { inject } from "vue";
//assets
import token from "../assets/koa-token.png";
//icon
import { LockClosedIcon } from "@heroicons/vue/outline";
//composables
import { imgPlaceholder } from "../composables/img";

const props = defineProps({
  item: null,
  eventName: Object,
});

// console.log(props.item);
// console.log(props.eventName);

const { isAuth, isModalAuthVisible } = inject("auth");
const { currentBet, isModalBetVisible } = inject("bets");

const openModalFight = (fight, fighter) => {

  isModalBetVisible.value = true;
  currentBet.value = {
    eventName: props.eventName.name,
    dateTime: props.eventName.dateTime,
    eventId: fight.eventId,
    fightId: fight.fightId,
    weightClass: fight.weightClass,
    fighters: fight.fighters,
    winner: fighter,
  };
};

const openModalAuth = () => {
  isModalAuthVisible.value = true;
};
</script>

<template>
  <tr>
    <td>
      <div
        class="flex items-start content- sm:items-center flex-col sm:flex-row"
      >
        <div
          class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
        >
          <div class="avatar w-10">
            <div class="w-12 h-12 mask mask-squircle">
              <img
                :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${item.fighters[0].firstName} ${item.fighters[0].lastName}.png`"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">
              {{ item.fighters[0].firstName }} {{ item.fighters[0].lastName }}
            </div>
            <div class="text-sm opacity-50">
              {{ item.weightClass }}
            </div>
          </div>
        </div>
        <!-- <div class="text-sm text-center">19:30</div> -->
        <div
          v-if="item.status == 'Canceled'"
          class="badge badge-accent hidden sm:inline-flex"
        >
          0 - 0
        </div>
        <div
          v-else-if="item.status == 'Scheduled'"
          class="badge badge-ghost hidden sm:inline-flex"
        >
          0 - 0
        </div>
        <div
          v-else-if="item.status == 'Final'"
          class="badge badge-secondary hidden hidden sm:inline-flex"
        >
          <template v-if="item.winnerId === item.fighters[0].fighterId">
            1 - 0</template
          >
          <template v-else-if="item.winnerId === item.fighters[1].fighterId">
            0 - 1</template
          >
        </div>
        <div v-else class="badge badge-secondary hidden sm:inline-flex">
          {{ item.status }}
        </div>
        <div
          class="flex flex-1 items-center space-x-3 sm:space-x-0 flex-row sm:flex-col"
        >
          <div class="avatar w-10">
            <div class="w-12 h-12 mask mask-squircle">
              <img
                :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${item.fighters[1].firstName} ${item.fighters[1].lastName}.png`"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">
              {{ item.fighters[1].firstName }} {{ item.fighters[1].lastName }}
            </div>
            <div class="text-sm opacity-50">
              {{ item.weightClass }}
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>
      <div
        class="flex justify-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-3 flex-col sm:flex-row"
      >
        <button
          class="btn btn-active"
          @click="
            isAuth ? openModalFight(item, item.fighters[0]) : openModalAuth()
          "
          :disabled="item.status === 'Final'"
        >
          <component
            v-if="item.status === 'Final'"
            :is="LockClosedIcon"
            class="inline-block w-6 h-6 stroke-current"
          />
          <img v-else class="flex-0 h-5" :src="token" />
        </button>
        <button
          class="btn btn-active btn"
          @click="
            isAuth ? openModalFight(item, item.fighters[0]) : openModalAuth()
          "
          :disabled="item.status === 'Final'"
        >
          <component
            v-if="item.status === 'Final'"
            :is="LockClosedIcon"
            class="inline-block w-6 h-6 stroke-current"
          />
          <img v-else class="flex-0 h-5" :src="token" />
        </button>
      </div>
    </td>
  </tr>
</template>
