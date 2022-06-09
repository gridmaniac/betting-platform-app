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

const { isAuth, isModalAuthVisible } = inject("auth");
const { currentBet, isModalBetVisible } = inject("bets");

const openModalFight = (fight, fighter) => {
  console.log(fight);
  isModalBetVisible.value = true;
  currentBet.value = {
    eventName: props.eventName.name,
    dateTime: props.eventName.dateTime,
    eventId: fight.eventId,
    fightId: fight._id,
    weightClass: fight.qualifier,
    fighters: fight.competitors,
    winner: fighter,
    dataTime: fight.startTime,
    status: fight.status,
    sport: fight.sport,
    category: fight.category,
  };
};

const openModalAuth = () => {
  isModalAuthVisible.value = true;
};

const getNormalName = (name) => {
  return `${name.split(", ")[1]} ${name.split(", ")[0]}`;
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
                :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${getNormalName(item.competitors[0].name)}.png`"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">
              {{ getNormalName(item.competitors[0].name) }}
            </div>
            <div class="text-sm opacity-50">
              {{ item.competitors[0].abbreviation }}
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
                :src="`https://koacombat.nyc3.cdn.digitaloceanspaces.com/fighters/${getNormalName(item.competitors[1].name)}.png`"
                alt="Avatar Tailwind CSS Component"
                @error="imgPlaceholder"
              />
            </div>
          </div>
          <div class="text-left sm:text-center">
            <div class="font-bold">
              {{ getNormalName(item.competitors[1].name) }}
            </div>
            <div class="text-sm opacity-50">
              {{ item.competitors[1].abbreviation }}
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
            isAuth ? openModalFight(item, item.competitors[0]) : openModalAuth()
          "
          :disabled="item.status === 'Final'"
        >
          <component
            v-if="item.status === 'Final'"
            :is="LockClosedIcon"
            class="inline-block w-6 h-6 stroke-current"
          />
          <div v-else class="flex">
            <img class="h-4" :src="token" />
            <img class="h-4 -ml-2" :src="token" />
          </div>
        </button>
        <button
          class="btn btn-active btn"
          @click="
            isAuth ? openModalFight(item, item.competitors[0]) : openModalAuth()
          "
          :disabled="item.status === 'Final'"
        >
          <component
            v-if="item.status === 'Final'"
            :is="LockClosedIcon"
            class="inline-block w-6 h-6 stroke-current"
          />
          <div v-else class="flex">
            <img class="h-4" :src="token" />
            <img class="h-4 -ml-2" :src="token" />
          </div>
        </button>
      </div>
    </td>
  </tr>
</template>
